import GridPanelSkeleton from "./GridPanelSkeleton";
import MiniatureCard from "./MiniatureCard";


interface GridPanelProps {
  data: any;
  isProfile?:boolean;
}

function GridPanel({data, isProfile}: GridPanelProps) {
  return (
    <>
      {(!data.isLoading && data.data) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.data.map((item:any, index:number) => <MiniatureCard title={item.name || item.title} subtitle={item.artist || 'Artista'} image={item.image} key={index} isProfile={isProfile}/>)}
        </div>
      ): (
        <GridPanelSkeleton/>
      )}
    </>
  )
}

export default GridPanel