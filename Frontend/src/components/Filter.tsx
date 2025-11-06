import { filters, useSearchStore } from "@/store/useSearchStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

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
        <Button 
          key={index}
          variant='filter'
          onClick={() => handleChangeFilter(filter)}
          className={`${filter === currentFilter ? 'bg-primary ring-2 ring-primary' : ''}`}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}

export default Filter