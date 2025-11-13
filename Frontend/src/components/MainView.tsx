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
} from "@/services/deezer.service";

import MainSectionSkeleton from "./MainSectionSkeleton";
import { useNavigate } from "react-router-dom";
import { filters } from "@/store/useSearchStore";
import { usePlayerStore } from "@/store/usePlayerStore";

function MainView() {
  const navigate = useNavigate();
  const { replaceQueue } = usePlayerStore();

  const handleNavigate = (filter: string) => navigate(`/section/${filter}`);
  const handleOnCardClick = (id:number, filter:string) => navigate(`/content/${id}/${filter}`);

  const cacheData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  };


  const getCachedData = (key: string) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    try {
      const parsed = JSON.parse(cached);
      return parsed.data;
    } catch {
      return null;
    }
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["mostPopularTracks"],
        queryFn: async () => {
          try {
            const data = await getMostPopularTracks();
            cacheData("mostPopularTracks", data);
            return data;
          } catch (err) {
            const cached = getCachedData("mostPopularTracks");
            if (cached) return cached; // fallback offline
            throw err;
          }
        },
      },
      {
        queryKey: ["popularArtists"],
        queryFn: async () => {
          try {
            const data = await getMostPopularArtists();
            cacheData("popularArtists", data);
            return data;
          } catch (err) {
            const cached = getCachedData("popularArtists");
            if (cached) return cached;
            throw err;
          }
        },
      },
      {
        queryKey: ["popularAlbums"],
        queryFn: async () => {
          try {
            const data = await getMostPopularAlbums();
            cacheData("popularAlbums", data);
            return data;
          } catch (err) {
            const cached = getCachedData("popularAlbums");
            if (cached) return cached;
            throw err;
          }
        },
      },
      {
        queryKey: ["popularPlaylists"],
        queryFn: async () => {
          try {
            const data = await getMostPopularPlayLists();
            cacheData("popularPlaylists", data);
            return data;
          } catch (err) {
            const cached = getCachedData("popularPlaylists");
            if (cached) return cached;
            throw err;
          }
        },
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
