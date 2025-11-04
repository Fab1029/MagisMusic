import { useLocation, useNavigate } from "react-router-dom";
import GridPanelSkeleton from "./GridPanelSkeleton";
import MiniatureCard from "./MiniatureCard";
import { useSearchStore } from "@/store/useSearchStore";


interface GridPanelProps {
  data: any;
  isProfile?:boolean;
}

function GridPanel({data, isProfile}: GridPanelProps) {
  const navigate = useNavigate();
  const {filter} = useSearchStore();

  const handleOnCardClick = (id:number) => {
    navigate(`/content/${id}/${filter}`);
  };

  return (
    <>
      {(!data.isLoading && data.data) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.data.map((item:any, index:number) => 
            <MiniatureCard 
              key={index} 
              title={item.name || item.title} 
              subtitle={item.artist || 'Artista'} 
              image={item.image} 
              isProfile={isProfile}
              onCardClick={() => handleOnCardClick(item.id)}

            />
          )}
        </div>
      ): (
        <GridPanelSkeleton/>
      )}
    </>
  )
}

export default GridPanel