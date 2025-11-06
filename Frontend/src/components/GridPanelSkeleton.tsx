import MiniatureCardSkeleton from "./MiniatureCardSkeleton"

function GridPanelSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {Array.from({length: 25}, (_, index) => 
        <MiniatureCardSkeleton key={index}/>
      )}
    </div>
  )
}

export default GridPanelSkeleton