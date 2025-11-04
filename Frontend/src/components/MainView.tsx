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
import ContentView from "./ContentView";
import { useNavigate } from "react-router-dom";

function MainView() {
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
          <HeaderSection title="Canciones en tendencia"/>
          <CustomCarousel
            data={tracks.data.map((item: any, i: number) => (
              <MiniatureCard
                key={i}
                title={item.title}
                subtitle={item.artist}
                image={item.image}
              />
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

      {(!artists.isLoading && artists.data) ? (
        <section>
          <HeaderSection title="Artistas" />
          <CustomCarousel
            data={artists.data.map((item: any, i: number) => (
              <MiniatureCard key={i} isProfile title={item.name} image={item.image} subtitle="Artista"/>
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

      {(!albums.isLoading && albums.data) ? (
        <section>
          <HeaderSection title="Álbumes" />
          <CustomCarousel
            data={albums.data.map((item: any, i: number) => (
              <MiniatureCard key={i} title={item.title} image={item.image} subtitle={item.artist}/>
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}

      {(!playlists.isLoading && playlists.data) ? (
        <section>
          <HeaderSection title="Playlists" />
          <CustomCarousel
            data={playlists.data.map((item: any, i: number) => (
              <MiniatureCard key={i} title={item.title} image={item.image} />
            ))}
          />
        </section>
      ): (
        <MainSectionSkeleton/>
      )}
      {/*<ContentView tracks={tracks}/>*/}
    </div>
  );
}

export default MainView;
