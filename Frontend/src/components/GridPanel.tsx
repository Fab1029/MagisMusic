import { useLocation, useNavigate } from "react-router-dom";
import GridPanelSkeleton from "./GridPanelSkeleton";
import MiniatureCard from "./MiniatureCard";

interface GridPanelProps {
  data: any;
  isProfile?:boolean;
}

function GridPanel({data, isProfile}: GridPanelProps) {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const handleOnCardClick = (id:number) => {
    if (pathName.split('/')[1] === 'search') {
      navigate(`/content/${id}/${pathName.split('/')[3]}`);
    }
    else {
      navigate(`/content/${id}/${pathName.split('/')[2]}`);
    }
    
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