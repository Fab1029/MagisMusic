import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { CustomTable } from "./CustomTable";
import { useJamStore } from "@/store/useJamStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { columns, columnsMobile } from "./Columns";
import icons from "@/constants/icons";
import type { Track } from "@/models/Track";

export default function JamView() {
  const isMobile = useIsMobile();
  const pathName = useLocation().pathname;
  const idJamRoute = pathName.split("/")[2];
  const {
    idJam,
    jamQueue,
    currentSong,
    connectToJam,
    leaveJam,
    socket,
  } = useJamStore();

  const { songs , setSongs } = usePlayerStore();
  
  const handleRowClick = (song: Track, index:number) => {
    if (!socket || !idJam) return;

    socket.emit("jamEvent", {
      jamId: idJam,
      event: { type: "PLAY_SONG", index: index },
    });

    //setSongs(songs, index);
  };

  return (
    <div>
      <div className="p-5 relative">
        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="gap-10 flex items-end-safe relative z-1">
          <img className="w-64 h-64 rounded-md" src={icons.jamIcon} />
          <div className="gap-5 flex flex-col">
            <h1 className="font-bold text-7xl text-white truncate max-w-xl">
              Jam
            </h1>
            <h3 className="font-bold text-2xl text-accent-foreground truncate max-w-xl">
              {idJamRoute}
            </h3>
          </div>
        </div>

        <div className="mt-6 flex gap-4 relative z-1 items-center">
          {idJam === "" ? (
            <Button variant="pillHover" onClick={() => connectToJam(idJamRoute)}>
              Unirse
            </Button>
          ) : (
            <Button variant="pillHover" onClick={leaveJam}>
              Abandonar
            </Button>
          )}

          <TooltipDropdownButton
            trigger={
              <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-105">
                <img src={icons.moreIcon} className="w-10 h-10 object-contain" alt="Más opciones"/>
              </Button>
            }
            infoHover="Más opciones"
            menuItems={[{ label: "Opción 1" }]}
          />
        </div>
      </div>

      <CustomTable
        columns={isMobile ? columnsMobile : columns}
        data={songs}
        onRowClick={handleRowClick}
        selectedSongId={currentSong?.id || null}
      />
    </div>
  );
}
