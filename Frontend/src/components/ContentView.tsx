import icons from "@/constants/icons";
import { CustomTable } from "./CustomTable";
import { useLocation } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import { getAlbumById, getArtistById, getPlayListById, getTrackById } from "@/services/deezer.service";
import { useQuery } from "@tanstack/react-query";
import CustomTableSkeleton from "./CustomTableSkeleton";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useJamStore } from "@/store/useJamStore";
import { errorToast } from "./CustomSonner";
import { columns, columnsMobile } from "./Columns";
import { useIsMobile } from "@/hooks/useIsMobile";

function ContentView() {
  const isMobile = useIsMobile();
  const { idJam } = useJamStore();
  const pathName = useLocation().pathname;
  
  const filter = pathName.split('/')[3];
  const id = Number(pathName.split('/')[2]);
  const { setSongs, currentSong } = usePlayerStore();

  const handleQuery = () => {
    switch (filter) {
      case filters[1]:
        return  getTrackById(id);
      case filters[2]:
        return  getArtistById(id);
      case filters[3]:
        return  getAlbumById(id);
      case filters[4]:
        return  getPlayListById(id);
      default:
        return [];
    }
  };

  const data = useQuery({
    queryKey: ["dataContentView", filter, id],
    queryFn: () => handleQuery(),
  });

  const handleRowClick = (song: any, index: number) => {
    const tracks = data.data.tracks?.map((item:any) => ({...item})) || [data.data];
    setSongs(tracks, index);
  };

  const handlePlayButton = () => {
    if (idJam)
      errorToast(
        'No se puede reproducir en este momento',
        'Cierra el Jam actual para reproducir tus canciones'
      );
    else {
      const tracks = data.data.tracks?.map((item:any) => ({...item})) || [data.data];
      setSongs(tracks, 0); 
    }
    
  };

  return (
    <div>
      <div className="p-3 md:p-5 relative">

        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-t-md" />

        <div className="gap-2 flex flex-col relative z-1 items-start md:flex-row md:items-end-safe md:gap-10">
          {(!data.isLoading && data.data) ? (
            <img
              className="w-64 h-64 rounded-md"
              src={data.data.image}
            />
          ): (
            <Skeleton className="w-64 h-64 rounded-md"/>
          )}
          
          <div className="gap-2 flex flex-col md:gap-5">
            {(!data.isLoading && data.data) ? (
              <>
                <h1 className="font-bold text-white truncate text-4xl max-w-70 md:text-7xl md:max-w-xl">{data.data.title || data.data.name}</h1>
                <h3 className="font-bold text-accent-foreground text-xl truncate max-w-70 md:text-2xl md:max-w-xl">{data.data.artist || data.data.description || 'Artista'}</h3>
              </>
            ): (
              <>
                <Skeleton className="h-10 w-60 md:h-15"/>
                <Skeleton className="h-8 w-30 md:h-10"/>
              </>
            )}
            
          </div>
        </div>

        <div className="mt-6 flex gap-4 relative z-1 items-center">
          <Button
            onClick={handlePlayButton} 
            className="
              flex items-center justify-center 
              bg-primary rounded-full w-14 h-14 p-1
              transition-all duration-200 ease-out
              hover:scale-114 cursor-pointer
            "
          >
            <img 
              className="w-7 h-7 object-contain" 
              src={icons.playIcon}
              alt="Play"
            />
          </Button>
          
          <Button
            variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-110"
          >
            <img src={icons.unlikeIcon} className="w-8 h-8 object-contain" alt="Like item"/>
          </Button>
          
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
      {(!data.isLoading && data.data) ? (
        <CustomTable columns={isMobile ? columnsMobile : columns} data={data.data.tracks?.map((item:any) => ({...item})) || [data.data]}
        onRowClick={handleRowClick}
        selectedSongId={currentSong?.id || null}
        />
      ): (
        <CustomTableSkeleton rowsNumber={3}/>
      )}
    </div>
  );
}

export default ContentView;
