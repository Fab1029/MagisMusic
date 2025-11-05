import { filters, useSearchStore } from "@/store/useSearchStore";
import { useLocation, useNavigate } from "react-router-dom";

function Filter() {
  const navigate = useNavigate();
  const { query } = useSearchStore();
  const currentFilter = useLocation().pathname.split('/')[3];

  const handleChangeFilter = (filter:string) => {
    navigate(`/search/${query.trim()}/${filter}`);
  };

  return (
    <div className="gap-2 flex items-center">
      {filters.map((filter, index) => (
        <button 
          key={index}
          onClick={() => handleChangeFilter(filter)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${filter === currentFilter ? 'bg-primary ring-2 ring-primary' : 'bg-card-foreground'}`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default Filter