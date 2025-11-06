import { useQueries } from "@tanstack/react-query";
import CustomCarousel from "./CustomCarousel";
import HeaderSection from "./HeaderSection";
import MiniatureCard from "./MiniatureCard";
import { 
  getMostPopularTracks, 
  getMostPopularArtists, 
  getMostPopularAlbums, 
  getMostPopularPlayLists 
} from "@/services/deezer.service";

import MainSectionSkeleton from "./MainSectionSkeleton";
import { useNavigate } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import PlayButton from "./PlayButton";
import icons from "@/constants/icons";

function MainView() {
  const navigate = useNavigate();

  const handleNavigate = (filter: string) => {
    navigate(`/section/${filter}`);
  };

  const handleOnCardClick = (id:number, filter:string) => {
    navigate(`/content/${id}/${filter}`);
  }

  const results = useQueries({
    queries: [
      {
        queryKey: ["mostPopularTracks"],
        queryFn: () => getMostPopularTracks(),
      },
      {
        queryKey: ["popularArtists"],
        queryFn: () => getMostPopularArtists(),
      },
      {
        queryKey: ["popularAlbums"],
        queryFn: () => getMostPopularAlbums(),
      },
      {
        queryKey: ["popularPlaylists"],
        queryFn: () => getMostPopularPlayLists(),
      },
    ],
  });

  const [tracks, artists, albums, playlists] = results;

  return (
    <div className="gap-5 flex flex-col">
      
      {(!tracks.isLoading && tracks.data) ? (
        <section>
          <HeaderSection title="Canciones en tendencia" onClick={() => handleNavigate(filters[1])}/>
          <CustomCarousel
            data={tracks.data.map((item: any, i: number) => (
              <MiniatureCard
                key={i}
                title={item.title}
                subtitle={item.artist}
                image={item.image}
                onCardClick={() => handleOnCardClick(item.id, filters[1])}
                child={(
                  <PlayButton 
                    className='top-1/2 right-3'
                    child={(
                      <img 
                        className="w-5 h-5 object-contain" 
                        src={icons.playIcon}
                        alt="Play"
                      />
                    )} 
                    onClick={() => {}}
                  />
                )} 
              />
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

      {(!artists.isLoading && artists.data) ? (
        <section>
          <HeaderSection title="Artistas" onClick={() => handleNavigate(filters[2])}/>
          <CustomCarousel
            data={artists.data.map((item: any, i: number) => (
              <MiniatureCard 
                key={i} 
                isProfile 
                title={item.name} 
                image={item.image} 
                subtitle="Artista" 
                onCardClick={() => handleOnCardClick(item.id, filters[2])}
                child={(
                  <PlayButton 
                    className='top-1/2 right-3'
                    child={(
                      <img 
                        className="w-5 h-5 object-contain" 
                        src={icons.playIcon}
                        alt="Play"
                      />
                    )} 
                    onClick={() => {}}
                  />
                )} 
              />
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

      {(!albums.isLoading && albums.data) ? (
        <section>
          <HeaderSection title="Álbumes" onClick={() => handleNavigate(filters[3])}/>
          <CustomCarousel
            data={albums.data.map((item: any, i: number) => (
              <MiniatureCard 
                key={i} 
                title={item.title} 
                image={item.image} 
                subtitle={item.artist} 
                onCardClick={() => handleOnCardClick(item.id, filters[3])}
                child={(
                  <PlayButton 
                    className='top-1/2 right-3'
                    child={(
                      <img 
                        className="w-5 h-5 object-contain" 
                        src={icons.playIcon}
                        alt="Play"
                      />
                    )} 
                    onClick={() => {}}
                  />
                )} 
              />
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

      {(!playlists.isLoading && playlists.data) ? (
        <section>
          <HeaderSection title="Playlists" onClick={() => handleNavigate(filters[4])}/>
          <CustomCarousel
            data={playlists.data.map((item: any, i: number) => (
              <MiniatureCard 
                key={i} 
                title={item.title} 
                image={item.image} 
                onCardClick={() => handleOnCardClick(item.id, filters[4])}
                child={(
                  <PlayButton 
                    className='top-1/2 right-3'
                    child={(
                      <img 
                        className="w-5 h-5 object-contain" 
                        src={icons.playIcon}
                        alt="Play"
                      />
                    )} 
                    onClick={() => {}}
                  />
                )} 
              />
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

    </div>
  );
}

export default MainView;
