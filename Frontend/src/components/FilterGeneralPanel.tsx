import { CustomTable } from "./CustomTable"
import HeaderSection from "./HeaderSection"
import MiniatureCardLarge from "./MiniatureCardLarge"
import CustomCarousel from "./CustomCarousel"
import MiniatureCard from "./MiniatureCard"
import MainSectionSkeleton from "./MainSectionSkeleton"
import CustomTableSkeleton from "./CustomTableSkeleton"
import { Skeleton } from "./ui/skeleton"
import MiniatureCardLargeSkeleton from "./MiniatureCardLargeSkeleton"
import { columnsMin } from "@/models/Track"
import { useNavigate } from "react-router-dom"
import { filters, useSearchStore } from "@/store/useSearchStore"
import PlayButton from "./PlayButton"
import icons from "@/constants/icons"

interface FilterGeneralPanelProps {
	tracks:any;
	artists:any;
	albums:any;
	playlists:any;
}

function FilterGeneralPanel({tracks, artists, albums, playlists}: FilterGeneralPanelProps) {
  const navigate = useNavigate();
  const { query } = useSearchStore();

  const handleNavigate = (filter:string) => {
    navigate(`/search/${query.trim()}/${filter}`);
  };

  const handleOnCardClick = (id:number, filter:string) => {
    navigate(`/content/${id}/${filter}`);
  };

  return (
    <div className="gap-5 flex flex-col">
			<div className="gap-2 flex">
				<section className="gap-2 flex flex-col flex-1 h-full">
					{(!tracks.isLoading && tracks.data) ? (
						<>
							<h1 className="font-bold text-2xl">
								Resultado principal
							</h1>
							<MiniatureCard 
                clasName='gap-5 w-full h-full items-start'
                title={tracks.data[0].title} 
                subtitle={tracks.data[0].artist} 
                image={tracks.data[0].image}
                onCardClick={() => handleOnCardClick(tracks.data[0].id, filters[1])}
                child={(
                  <PlayButton 
                    className="w-15 h-15 right-10 bottom-10"
                    child={(
                      <img 
                        className="w-7 h-7 object-contain" 
                        src={icons.playIcon}
                        alt="Play"
                      />
                    )} 
                    onClick={() => {}}
                  />
                )}  
              />
						</>
					): (
						<>
							<Skeleton className="w-30 h-8"/>
							<MiniatureCardLargeSkeleton />
						</>
						
					)}
				</section>


				<section className="gap-2 flex flex-col flex-2 h-full">
					{(!tracks.isLoading && tracks.data) ? (
						<>
							<HeaderSection title={filters[1]} onClick={() => handleNavigate(filters[1])}/>
							<CustomTable columns={columnsMin} data={tracks.data.slice(0, 4)} showHeaders={false}/>
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
            data={artists.data.slice(0,10).map((item: any, i: number) => (
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
            data={albums.data.slice(0,10).map((item: any, i: number) => (
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
            data={playlists.data.slice(0,10).map((item: any, i: number) => (
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
  )
}

export default FilterGeneralPanel