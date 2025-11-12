import InfoCard from "./InfoCard";
import ListItemCard from "./ListItemCard";
import icons from "@/constants/icons";
import { Button } from "./ui/button"
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { InlineSearch } from "./InlineSearch";
import { createJam } from "../services/jam.service"; 
import { Menu, X } from "lucide-react";
import type React from "react";
import { useJamStore } from "@/store/useJamStore";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

interface AsideProps {
  isAsideMinimized: boolean;
  toggleAside: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  className?: string;
}

const Aside: React.FC<AsideProps> = ({
  isAsideMinimized, 
  toggleAside, 
  isMobileMenuOpen, 
  toggleMobileMenu, 
  className
}) => {
  const items_agregar = [
    { label: "Playlist", description: "Crea una lista de reproducción" },
    { label: "Carpeta", description: "Organiza tus listas de reproducción" },
    { label: "Jam", description: "Escuchen juntos desde cualquier lugar"},
  ]
  const items_recientes = [
    { label: "Sort by", disabled: true },
    { label: "Recientes" },
    { label: "Añadidos Recientes" },
    { label: "Alfabético" }
  ]

  const { idJam, setIdJam, socket, setSocket } = useJamStore();
  const navigate = useNavigate();

  const baseOptions = ["Playlist", "Artistas"];
  const optionsButtonPill = idJam ? [...baseOptions, "Jam"] : baseOptions;

  const crearPlaylist = () => {
    console.log("Crear playlist"); 
  } 
  const crearCarpeta = () => {
    console.log("Crear carpeta");
  }

  const crearJam = async () => {
    console.log("Crear Jam");
    const create = await createJam();
    const jamId = create.jamId;
    console.log(create);

    const newSocket = io("http://localhost:4000"); // backend
    
    setIdJam(jamId);
    setSocket(newSocket);
    
    newSocket.emit("createJam", jamId);

    newSocket.on("joined_ack", (msg) => {
      console.log("Conectado al jam:", msg);
    });
  }

  const handleFilterPlaylist = () => {
      console.log("Filtro aplicado: Playlist");
  }

  const handleFilterArtistas = () => {
      console.log("Filtro aplicado: Artistas");
  }
  
  const handleFilterJams = () => {
    if (idJam) {
      navigate(`/jam/${idJam}`); 
    } else {
        console.log("Error: No hay un Jam ID activo para navegar.");
    }
  }

  const accionesPill: { [key: string]: () => void } = {
      "Playlist": handleFilterPlaylist,
      "Artistas": handleFilterArtistas,
      "Jam": handleFilterJams,
  };

  const acciones = {
    Playlist: crearPlaylist,
    Carpeta: crearCarpeta,
    Jam: crearJam,
  }; 

  return (
    <aside 
      className={`
        fixed top-0 left-0 z-50 h-full overflow-y-auto custom-scrollbar pb-20 
        bg-background transition-transform duration-300 ease-in-out transform
        w-full ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex md:flex-col md:m-2 md:p-2 md:rounded-md md:bg-card
        md:w-[28rem] md:shrink-0 md:gap-5 
        ${className || ''} 
      `}
    >
      <div className="flex flex-col gap-3 p-3 md:p-0 md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center w-full md:w-auto p-1 md:p-0">
           <Button onClick={toggleMobileMenu} variant="ghost" className="md:hidden p-0 w-8 h-8">
             <X className="w-6 h-6 text-white" />
            </Button>
            <h1 
                className={`
                font-bold transition-opacity duration-300 text-lg 
                opacity-100 md:inline
                `}
            >
              Tu biblioteca
            </h1>
        <div className="md:hidden">
          <TooltipDropdownButton
            trigger={
              <Button 
                  variant="pill" 
                  className="bg-card p-2 rounded-full gap-3 w-8 h-8 flex justify-center items-center"
                >
                <img className="w-5 h-5" src={icons.agregarIcon} alt="Opciones" />
              </Button>
            }
           infoHover="Crear playlist, carpeta o jam"
           menuItems={items_agregar}
            onSelect={(item) => acciones[item.label]?.()}
          />
        </div>
    </div>

    <div className={`hidden md:block`}>
      <TooltipDropdownButton
        trigger={
          <Button 
              variant="pill" 
              className={`bg-card p-2 rounded-full gap-3 transition-all duration-300 w-auto`}
            >
            <img className="w-5 h-5" src={icons.agregarIcon} alt="Opciones" />
            <span className="font-bold">Create</span>
          </Button>
        }
        infoHover="Crear playlist, carpeta o jam"
        menuItems={items_agregar}
        onSelect={(item) => acciones[item.label]?.()}
      />
    </div>

    </div>

   <div 
            className={`
                flex flex-col gap-3 md:gap-8 transition-opacity duration-300 px-3
                'opacity-100'
                md:block
            `}
        >
            <div className="flex gap-3 flex-wrap"> 
                {optionsButtonPill.map((btn, index) => (
                  <Button 
                    key={index} 
                    variant="pill"
                    onClick={accionesPill[btn]}
                  >
                    {btn}
                  </Button>
                ))
                }
            </div>

            <div className="flex justify-between">
              <InlineSearch />
                <CustomDropdownMenu
                  trigger = {
                    <Button variant="pillHoverSecondary">
                      Recientes
                    </Button>
                  }
                  menuItems={items_recientes}
            />
        </div>

          <div>
            <ListItemCard name="Perreando evangelicas" description="Playlist • usuario"/>
            <ListItemCard name="Gorillaz" description="Artista"/>
          </div>

        <InfoCard 
          title="Crea tu primera playlist" 
          description="Es muy fácil! Te vamos a ayudar"
          textButton="Crear playlist"
          className="mx-2 md:mb-4"
        />
        <InfoCard 
          title="Busquemos algunos podcast para seguir" 
          description="Te mantendremos al tanto de los nuevos episodios"
          textButton="Explorar podcast"
          className="mx-2 md:mb-4"
        />
      </div>

    </aside>
  );
}

export default Aside;