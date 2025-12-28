import { useQueries } from "@tanstack/react-query";
import CustomCarousel from "./CustomCarousel";
import HeaderSection from "./HeaderSection";
import MiniatureCard from "./MiniatureCard";
import { 
  getMostPopularTracks, 
  getMostPopularArtists, 
  getMostPopularAlbums, 
  getMostPopularPlayLists, 
  getArtistById,
  getAlbumById,
  getPlayListById
} from "@/services/deezer";

import MainSectionSkeleton from "./MainSectionSkeleton";
import { useNavigate } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import { usePlayerStore } from "@/store/usePlayerStore";

function MainView() {
  const navigate = useNavigate();
  const { replaceQueue } = usePlayerStore();

  const handleNavigate = (filter: string) => navigate(`/section/${filter}`);
  const handleOnCardClick = (id:number, filter:string) => navigate(`/content/${id}/${filter}`);

  const results = useQueries({
    queries: [
      {
        queryKey: ["mostPopularTracks"],
        queryFn: () => getMostPopularTracks(),
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false    
      },
      {
        queryKey: ["popularArtists"],
        queryFn: () => getMostPopularArtists(),
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false 
      },
      {
        queryKey: ["popularAlbums"],
        queryFn: () => getMostPopularAlbums(),
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false 
      },
      {
        queryKey: ["popularPlaylists"],
        queryFn: () => getMostPopularPlayLists(),
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false 
      },
    ],
  });

  const [tracks, artists, albums, playlists] = results;

  const handlePlayButton = async(id: number, filter:string) => {
    let response;
    switch (filter) {
      case filters[2]: response = await getArtistById(id); break;
      case filters[3]: response = await getAlbumById(id); break;
      case filters[4]: response = await getPlayListById(id); break;
      default: return;
    }
    const tracks = response.tracks?.map((item:any) => ({...item})) || [response];
    replaceQueue(tracks); 
  };

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
                onPlayClick={() => replaceQueue([item])}
                onCardClick={() => handleOnCardClick(item.id, filters[1])}
              />
            ))}
          />
        </section>
      ): <MainSectionSkeleton/>}

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
                onPlayClick={() => handlePlayButton(item.id, filters[2])}
                onCardClick={() => handleOnCardClick(item.id, filters[2])}
              />
            ))}
          />
        </section>
      ): <MainSectionSkeleton/>}

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
                onPlayClick={() => handlePlayButton(item.id, filters[3])}
                onCardClick={() => handleOnCardClick(item.id, filters[3])}
              />
            ))}
          />
        </section>
      ): <MainSectionSkeleton/>}

      {(!playlists.isLoading && playlists.data) ? (
        <section>
          <HeaderSection title="Playlists" onClick={() => handleNavigate(filters[4])}/>
          <CustomCarousel
            data={playlists.data.map((item: any, i: number) => (
              <MiniatureCard 
                key={i} 
                title={item.title} 
                image={item.image} 
                onPlayClick={() => handlePlayButton(item.id, filters[4])}
                onCardClick={() => handleOnCardClick(item.id, filters[4])}
              />
            ))}
          />
        </section>
      ): <MainSectionSkeleton/>}

    </div>
  );
}

export default MainView;
