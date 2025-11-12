import icons from "@/constants/icons";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { useJamStore } from "@/store/useJamStore";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { CustomTable } from "./CustomTable";
import CustomTableSkeleton from "./CustomTableSkeleton";
import { columns, columnsMobile } from "./Columns";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useIsMobile } from "@/hooks/useIsMobile";

function JamView() {
  const isMobile = useIsMobile();
  const pathName = useLocation().pathname;
  const idJamRoute = pathName.split('/')[2];
  const { idJam, setIdJam, socket, setSocket, jamQueue, addSongToQueue, clearQueue, currentSong, setCurrentSong } = useJamStore();
  const { setSongs, setIsPlaying } = usePlayerStore();

  const handleRowClick = (song, index) => {
    console.log(song);
    console.log("Canción de la cola clickeada:", song.title);
    if (!socket || !idJam) return;
      console.log(`Pidiendo reproducir: ${song.title}`);
      
      socket.emit("jamEvent", { 
          jamId: idJam, 
          event: { 
              type: "PLAY_SONG", 
              data: song 
          } 
      });
      setCurrentSong(song);
      setSongs([song], 0);
  };

  const handleUnirse = () => {
    console.log("Confirma unirse al Jam");
    if (socket?.connected && idJam === idJamRoute) { //si ya esta unido
        return; 
    }

    if (socket) socket.disconnect(); //evitar multiples conexioenes activas/Jams
    
    const newSocket = io("http://localhost:4000"); // backend
  
    newSocket.emit("joinJam", { jamId: idJamRoute });

    newSocket.on("joined_ack", (msg) => {
      console.log("Conectado al jam:", msg);
    });

    setIdJam(idJamRoute);
    setSocket(newSocket);

  }

  const handleAbandonar = () => {
    console.log("Abandona el Jam");
    socket?.emit("leave_jam", idJamRoute);
    socket?.disconnect();
    setIdJam("");
    setSocket(null);
    clearQueue();
  }

  useEffect(() => {
    if (socket && socket.connected && idJam === idJamRoute) {
    
      const handleJamEvent = (event) => {
        console.log("Evento de Jam recibido (del socket):", event);
        if (event.type === 'ADD_SONG' && event.data) {
          addSongToQueue(event.data); 
          console.log(`Canción '${event.data.title}' agregada a la cola. Tamaño actual: ${jamQueue.length + 1}`);
        } else if (event.type === 'PLAY_SONG' && event.data) {
            console.log(`[REPRODUCCIÓN GLOBAL] Iniciando: ${event.data.title}`);
            setIsPlaying(true);
            // El cliente recibe la señal de reproducir
            setCurrentSong(event.data); 
            
            setSongs([event.data], 0);
            
            //removeSongFromQueue(event.data.id); 
        } else if (event.type === 'PAUSE_SONG') { 
            console.log(`[REPRODUCCIÓN GLOBAL] Pausa solicitada.`);
            setIsPlaying(false);
        }
      };

      // Suscribirse al evento que viene de Kafka a través del servidor con websocket
      socket.on('jamEvent', handleJamEvent);
      
      return () => {
        // Limpieza: Desuscribirse cuando el componente se desmonte o las dependencias cambien
        socket.off('jamEvent', handleJamEvent);
      };
    }
}, [socket, idJam, idJamRoute, addSongToQueue, setCurrentSong, setSongs, setIsPlaying]);

  return (
    <div>
      <div className="p-5 relative">

        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="gap-10 flex items-end-safe relative z-1">  
          <img
              className="w-64 h-64 rounded-md"
              src={icons.jamIcon}
            />      
          <div className="gap-5 flex flex-col">
              <h1 className="font-bold text-7xl text-white truncate max-w-xl">Jam</h1>
              <h3 className="font-bold text-2xl text-accent-foreground truncate max-w-xl">{idJamRoute}</h3>
          </div>
        </div>

        <div className="mt-6 flex gap-4 relative z-1 items-center">      
          {idJam === "" ? (
            <Button
              variant="pillHover"
              className="inline-flex w-auto self-start"
              onClick={handleUnirse} 
            >
              Unirse
            </Button>
          ) : (
            <Button
              variant="pillHover"
              className="inline-flex w-auto self-start"
              onClick={handleAbandonar}
            >
              Abandonar
            </Button>
          )}
          
          <TooltipDropdownButton
            trigger={
              <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-105">
                <img src={icons.moreIcon} className="w-10 h-10 object-contain" alt="Like item"/>
              </Button>
            }
            infoHover="Más opciones"
            menuItems={[{label: 'Opcion 1'}]}
          />
          
        </div>
      </div>
      {(jamQueue.length > 0) ? (
        <CustomTable 
          columns={isMobile ? columnsMobile : columns}
          data={jamQueue}
          onRowClick={handleRowClick}
          selectedSongId={currentSong?.id || null}
        />
      ): (
        <div>No hay canciones aun</div>
      )}
    </div>
  );
}

export default JamView;
