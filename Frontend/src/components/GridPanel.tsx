import { useLocation, useNavigate } from "react-router-dom";
import GridPanelSkeleton from "./GridPanelSkeleton";
import MiniatureCard from "./MiniatureCard";
import { getAlbumById, getArtistById, getPlayListById, getTrackById } from "@/services/deezer";
import { filters } from "@/store/useSearchStore";
import { usePlayerStore } from "@/store/usePlayerStore";

interface GridPanelProps {
  data: any;
  isProfile?:boolean;
}

function GridPanel({data, isProfile}: GridPanelProps) {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const { setSongs} = usePlayerStore();
  const filter = pathName.split('/')[1] === 'search' ? 
    pathName.split('/')[3]
    :
    pathName.split('/')[2];
  
  const handlePlayButton = async(id: number, filter:string) => {
    let response;

    switch (filter) {
      case filters[1]:
        response = await getTrackById(id);
        break;
      case filters[2]:
        response = await getArtistById(id);
        break;
      case filters[3]:
        response = await getAlbumById(id);
        break;
      case filters[4]:
        response = await getPlayListById(id);
        break;
      default:
        return;
    }
    
    const tracks = response.tracks?.map((item:any) => ({...item})) || [response];
    setSongs(tracks, 0); 
  };

  return (
    <>
      {(!data.isLoading && data.data) ? (
        <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {data.data.map((item:any, index:number) => 
            <MiniatureCard 
              key={index} 
              title={item.name || item.title} 
              subtitle={item.artist || 'Artista'} 
              image={item.image} 
              isProfile={isProfile}
              onCardClick={() => navigate(`/content/${item.id}/${filter}`)}
              onPlayClick={() => handlePlayButton(item.id, filter)}
            />
          )}
        </div>
      ): (
        <GridPanelSkeleton/>
      )}
    </>
  )
}

export default GridPanel