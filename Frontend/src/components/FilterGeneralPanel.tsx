import { columnsMin, songs } from "@/constants/test"
import { CustomTable } from "./CustomTable"
import HeaderSection from "./HeaderSection"
import GridPanel from "./GridPanel"
import { filters } from "@/store/useSearchStore"
import MiniatureCardLarge from "./MiniatureCardLarge"


function FilterGeneralPanel() {
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

			<section>
				<HeaderSection title={filters[2]}/>
				<GridPanel data={Array.from({length: 5}, () => ({isProfile: true}) )}/>
			</section>
			
			<section>
				<HeaderSection title={filters[3]}/>
				<GridPanel data={Array.from({length: 5}, () => ({}) )}/>
			</section>

			<section>
				<HeaderSection title={filters[4]}/>
				<GridPanel data={Array.from({length: 5}, () => ({}) )}/>
			</section>



    </div>
  )
}

export default FilterGeneralPanel