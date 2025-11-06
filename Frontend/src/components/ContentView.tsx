import icons from "@/constants/icons";
import { CustomTable } from "./CustomTable";
import { columns } from "@/models/Track";
import { useLocation } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import { getAlbumById, getArtistById, getPlayListById, getTrackById } from "@/services/deezer.service";
import { useQuery } from "@tanstack/react-query";
import CustomTableSkeleton from "./CustomTableSkeleton";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";

function ContentView() {
  const pathName = useLocation().pathname;
  const filter = pathName.split('/')[3];
  const id = Number(pathName.split('/')[2]);

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

  return (
    <div>
      <div className="p-5 relative">

        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="gap-10 flex items-end-safe relative z-1">
          {(!data.isLoading && data.data) ? (
            <img
              className="w-64 h-64 rounded-md"
              src={data.data.image}
            />
          ): (
            <Skeleton className="w-64 h-64 rounded-md"/>
          )}
          
          <div className="gap-5 flex flex-col">
            {(!data.isLoading && data.data) ? (
              <>
                <h1 className="font-bold text-7xl text-white truncate max-w-xl">{data.data.title || data.data.name}</h1>
                <h3 className="font-bold text-2xl text-accent-foreground truncate max-w-xl">{data.data.artist || data.data.description || 'Artista'}</h3>
              </>
            ): (
              <>
                <Skeleton className="h-15 w-60"/>
                <Skeleton className="h-10 w-30"/>
              </>
            )}
            
          </div>
        </div>

        <div className="mt-6 flex gap-5 relative z-1 items-center">
          
          <Button
            variant={'play'}
            className="w-15 h-15 mr-5"
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

      <div>
        {(!data.isLoading && data.data) ? (
          <CustomTable columns={columns} data={data.data.tracks?.map((item:any) => ({...item})) || [data.data]}/>
        ): (
          <CustomTableSkeleton rowsNumber={3}/>
        )}
      </div>
      
    </div>
  );
}

export default ContentView;
