import { columnsMin, songs } from "@/constants/test"
import { CustomTable } from "./CustomTable"
import HeaderSection from "./HeaderSection"
import { filters } from "@/store/useSearchStore"
import MiniatureCardLarge from "./MiniatureCardLarge"
import CustomCarousel from "./CustomCarousel"
import MiniatureCard from "./MiniatureCard"
import MainSectionSkeleton from "./MainSectionSkeleton"

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
					<h1 className="font-bold text-2xl">
						Resultado principal
					</h1>
					<MiniatureCardLarge/>
				</section>

				<section className="gap-2 flex flex-col flex-1 h-full">
					<HeaderSection title={filters[1]}/>
					<CustomTable columns={columnsMin} data={songs.slice(0, 3)} showHeaders={false}/>
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