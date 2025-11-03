import { Skeleton } from "./ui/skeleton"

function GridPanelSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
			{Array.from({length: 25}, () => 
				<div className="gap-2 flex flex-col p-5">
					<Skeleton className="h-20 w-20"/>
					<Skeleton className="h-5 w-15"/>
					<Skeleton className="h-3 w-10"/>
				</div>
			)}
    </div>
  )
}

export default GridPanelSkeleton