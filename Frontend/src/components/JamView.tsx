import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { CustomTable } from "./CustomTable";
import { useJamStore } from "@/store/useJamStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { columns, columnsMobile } from "./Columns";
import icons from "@/constants/icons";
import ShareDialog from "./ShareDialog";


export default function JamView() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const idJamRoute = pathName.split("/")[2];
  const {
    idJam,
    connectToJam,
    leaveJam,
    isDialogOpen,
    setIsDialogOpen,
    uri
  } = useJamStore();

  const { songs } = usePlayerStore();
  
  const handleLeaveJam = () => {
    leaveJam();
    navigate('/');
  };

  return (
    <div>
      <ShareDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} url={uri}/>
      <div className="p-4 sm:p-5 relative">
        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-end-safe relative z-1">

          <img className="w-24 h-24 sm:w-64 sm:h-64 rounded-md" src={icons.jamIcon} alt="Jam Icon" />
          <div className="gap-2 sm:gap-5 flex flex-col min-w-0 flex-1">
            
            <h1 className="font-bold text-white truncate text-4xl max-w-70 md:text-7xl md:max-w-xl">
              Jam
            </h1>
            <h3 className="font-bold text-accent-foreground text-xl truncate max-w-70 md:text-2xl md:max-w-xl">
              {idJamRoute}
            </h3>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4 relative z-1 items-center">
          {idJam === "" ? (
            <Button variant="play" 
              className="hover:scale-105"
              onClick={() => connectToJam(idJamRoute)}
              >
              Unirse
            </Button>
          ) : (
            <Button 
              variant="pillHover" 
              onClick={handleLeaveJam}>
              Abandonar
            </Button>
          )}

          <TooltipDropdownButton
            trigger={
              <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-105">
                <img src={icons.moreIcon} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" alt="Más opciones"/>
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
      />
    </div>
  );
}
