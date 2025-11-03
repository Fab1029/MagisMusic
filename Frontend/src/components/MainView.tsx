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
    <div>
      {!tracks.isLoading && tracks.data && (
        <section>
          <HeaderSection title="Canciones en tendencia" />
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
      )}

      {!artists.isLoading && artists.data && (
        <section>
          <HeaderSection title="Artistas" />
          <CustomCarousel
            data={artists.data.map((item: any, i: number) => (
              <MiniatureCard key={i} isProfile title={item.name} image={item.image} subtitle="Artista"/>
            ))}
          />
        </section>
      )}

      {!albums.isLoading && albums.data && (
        <section>
          <HeaderSection title="Álbumes" />
          <CustomCarousel
            data={albums.data.map((item: any, i: number) => (
              <MiniatureCard key={i} title={item.title} image={item.image} subtitle={item.artist}/>
            ))}
          />
        </section>
      )}

      {!playlists.isLoading && playlists.data && (
        <section>
          <HeaderSection title="Playlists" />
          <CustomCarousel
            data={playlists.data.map((item: any, i: number) => (
              <MiniatureCard key={i} title={item.title} image={item.image} />
            ))}
          />
        </section>
      )}
    </div>
  );
}

export default MainView;
