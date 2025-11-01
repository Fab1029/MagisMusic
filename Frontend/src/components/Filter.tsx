import { filters, useSearchStore } from "@/store/useSearchStore";

function Filter() {
  const { filter, setFilter } = useSearchStore();

  const handleChangeFilter = (currentFilter:string) => {
    setFilter(currentFilter);
  };

  return (
    <div className="gap-2 flex items-center">
      {filters.map((category, index) => (
        <button 
          key={index}
          onClick={() => handleChangeFilter(category)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${category === filter ? 'bg-primary ring-2 ring-primary' : 'bg-card-foreground'}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Filter