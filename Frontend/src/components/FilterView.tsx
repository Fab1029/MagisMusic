import { filters, useSearchStore } from "@/store/useSearchStore"
import Filter from "./Filter"
import { CustomTable } from "./CustomTable";
import { columns, songs } from "@/constants/test";
import MiniatureCard from "./MiniatureCard";

function FilterView() {
  const { filter } = useSearchStore();

  const handleView = () => {
    switch(filter) {
      case filters[1]:
        return <CustomTable columns={columns} data={songs}/>
      case filters[2]:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 20 }, (_, i) => (
              <MiniatureCard key={i} isProfile={true} />
            ))}
          </div>
        )
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