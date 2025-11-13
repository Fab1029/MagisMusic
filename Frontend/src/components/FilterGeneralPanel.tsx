import { CustomTable } from "./CustomTable"
import HeaderSection from "./HeaderSection"
import CustomCarousel from "./CustomCarousel"
import MiniatureCard from "./MiniatureCard"
import MainSectionSkeleton from "./MainSectionSkeleton"
import CustomTableSkeleton from "./CustomTableSkeleton"
import { Skeleton } from "./ui/skeleton"
import { useNavigate } from "react-router-dom"
import { filters, useSearchStore } from "@/store/useSearchStore"
import MiniatureCardSkeleton from "./MiniatureCardSkeleton"
import { getAlbumById, getArtistById, getPlayListById } from "@/services/deezer.service"
import { usePlayerStore } from "@/store/usePlayerStore"
import { columnsMin } from "./Columns"
import type { Track } from "@/models/Track"

interface FilterGeneralPanelProps {
	tracks:any;
	artists:any;
	albums:any;
	playlists:any;
}

function FilterGeneralPanel({tracks, artists, albums, playlists}: FilterGeneralPanelProps) {
  const navigate = useNavigate();
  const { query } = useSearchStore();
  const { replaceQueue } = usePlayerStore();

  const handleNavigate = (filter:string) => {
    navigate(`/search/${query.trim()}/${filter}`);
  };

  const handleOnCardClick = (id:number, filter:string) => {
    navigate(`/content/${id}/${filter}`);
  };

  const handlePlayButton = async(id: number, filter:string) => {
    let response;

    switch (filter) {
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
    replaceQueue(tracks); 
  };

  return (
    <div className="gap-5 flex flex-col">
			<div className="md:gap-2 md:flex">
				<section className="gap-2 flex flex-col flex-1 h-full">
					{(!tracks.isLoading && tracks.data) ? (
						<>
							<h1 className="text-xl font-bold md:text-2xl">
								Resultado principal
							</h1>
							<MiniatureCard 
                clasName='gap-5 items-start md:w-100 md:h-full '
                title={tracks.data[0].title} 
                subtitle={tracks.data[0].artist} 
                image={tracks.data[0].image}
                onPlayClick={() => replaceQueue([tracks.data[0]])}
                onCardClick={() => handleOnCardClick(tracks.data[0].id, filters[1])}
              />
						</>
					): (
						<>
							<Skeleton className="w-30 h-8"/>
							<MiniatureCardSkeleton className="gap-6 p-0"/>
						</>
						
					)}
				</section>


				<section className="hidden md:gap-2 md:flex md:flex-col md:flex-2 md:h-full">
					{(!tracks.isLoading && tracks.data) ? (
						<>
							<HeaderSection title={filters[1]} onClick={() => handleNavigate(filters[1])}/>
							<CustomTable 
                columns={columnsMin} 
                data={tracks.data.slice(0, 4)} 
                showHeaders={false}
              />
						</>
						
					) : (
						<>
							<div className="flex items-center justify-between">
								<Skeleton className="h-8 w-35"/>
								<Skeleton className="h-8 w-20"/>
							</div>
							<CustomTableSkeleton rowsNumber={3}/>
						</>
						
					)}						
				</section>


				
			</div>

			{(!tracks.isLoading && tracks.data) ? (
        <section>
          <HeaderSection title="Canciones en tendencia" onClick={() => handleNavigate(filters[1])}/>
          <CustomCarousel
            data={tracks.data.slice(0,10).map((item: any, i: number) => (
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
      ): (
        <MainSectionSkeleton/>
      )}

      {(!artists.isLoading && artists.data) ? (
        <section>
          <HeaderSection title="Artistas" onClick={() => handleNavigate(filters[2])}/>
          <CustomCarousel
            data={artists.data.slice(0,10).map((item: any, i: number) => (
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
      ): (
        <MainSectionSkeleton/>
      )}

      {(!albums.isLoading && albums.data) ? (
        <section>
          <HeaderSection title="Álbumes" onClick={() => handleNavigate(filters[3])}/>
          <CustomCarousel
            data={albums.data.slice(0,10).map((item: any, i: number) => (
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
      ): (
        <MainSectionSkeleton/>
      )}

      {(!playlists.isLoading && playlists.data) ? (
        <section>
          <HeaderSection title="Playlists" onClick={() => handleNavigate(filters[4])}/>
          <CustomCarousel
            data={playlists.data.slice(0,10).map((item: any, i: number) => (
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
      ): (
        <MainSectionSkeleton/>
      )}



    </div>
  )
}

export default FilterGeneralPanel