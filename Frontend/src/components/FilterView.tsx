import { filters, useSearchStore } from "@/store/useSearchStore"
import Filter from "./Filter"
import { CustomTable } from "./CustomTable";
import { columns, songs } from "@/constants/test";
import GridPanel from "./GridPanel";

function FilterView() {
  const { filter } = useSearchStore();

  const handleView = () => {
    switch(filter) {
      case filters[1]:
        return <CustomTable columns={columns} data={songs}/>

      case filters[2]:
        return <GridPanel data={Array.from({length: 20}, () => ({isProfile: true}) )}/>
      
      case filters[3]:
        return <GridPanel data={Array.from({length: 20}, () => ({}) )}/>
      
      case filters[4]:
        return <GridPanel data={Array.from({length: 20}, () => ({}) )}/>
      
      default:
        return <div></div>
    }      
  }

  return (
    <div className="gap-2 flex flex-col">
      <Filter/>
      {handleView()}
    </div>
  )
}

export default FilterView