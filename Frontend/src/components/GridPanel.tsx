import MiniatureCard, { type MiniatureCardProps } from "./MiniatureCard";


interface GridPanelProps {
    data: MiniatureCardProps[];
}

function GridPanel({data}: GridPanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => <MiniatureCard key={index} isProfile={item.isProfile}/>)}
    </div>
  )
}

export default GridPanel