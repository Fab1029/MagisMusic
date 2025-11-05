import { Skeleton } from "./ui/skeleton"

function MiniatureCardLargeSkeleton() {
  return (
    <div className="gap-5 flex flex-col h-full w-full">
      <Skeleton className="h-30 w-30"/>
      <Skeleton className="h-8 w-30"/>
      <Skeleton className="h-5 w-40"/>
    </div>
  )
}

export default MiniatureCardLargeSkeleton