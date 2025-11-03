import { columnsMin } from "@/constants/test"
import { CustomTable } from "./CustomTable"
import HeaderSection from "./HeaderSection"
import { filters } from "@/store/useSearchStore"
import MiniatureCardLarge from "./MiniatureCardLarge"
import CustomCarousel from "./CustomCarousel"
import MiniatureCard from "./MiniatureCard"
import MainSectionSkeleton from "./MainSectionSkeleton"
import CustomTableSkeleton from "./CustomTableSkeleton"
import { Skeleton } from "./ui/skeleton"
import MiniatureCardLargeSkeleton from "./MiniatureCardLargeSkeleton"


interface FilterGeneralPanelProps {
	tracks:any;
	artists:any;
	albums:any;
	playlists:any;
}

function FilterGeneralPanel({tracks, artists, albums, playlists}: FilterGeneralPanelProps) {
  return (
    <div className="gap-5 flex flex-col">
			<div className="gap-2 flex">
				<section className="gap-2 flex flex-col flex-1 h-full">
					{(!tracks.isLoading && tracks.data) ? (
						<>
							<h1 className="font-bold text-2xl">
								Resultado principal
							</h1>
							<MiniatureCardLarge title={tracks.data[0].title} subtitle={tracks.data[0].artist} image={tracks.data[0].image}/>
						</>
					): (
						<>
							<Skeleton className="w-30 h-8"/>
							<MiniatureCardLargeSkeleton />
						</>
						
					)}
				</section>


				<section className="gap-2 flex flex-col flex-1 h-full">
					{(!tracks.isLoading && tracks.data) ? (
						<>
							<HeaderSection title={filters[1]}/>
							<CustomTable columns={columnsMin} data={tracks.data.slice(0, 3)} showHeaders={false}/>
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
          <HeaderSection title="Canciones en tendencia" />
          <CustomCarousel
            data={tracks.data.slice(0,10).map((item: any, i: number) => (
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
            data={artists.data.slice(0,10).map((item: any, i: number) => (
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
            data={albums.data.slice(0,10).map((item: any, i: number) => (
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
            data={playlists.data.slice(0,10).map((item: any, i: number) => (
              <MiniatureCard key={i} title={item.title} image={item.image} />
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