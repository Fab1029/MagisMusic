import { Skeleton } from "./ui/skeleton"

const MainSectionSkeleton = () => {
  return (
    <div className="w-full gap-5 flex flex-col">
      <div className="flex items-center justify-between">
        <Skeleton className="w-30 h-10 bg-card-foreground"/>
        <Skeleton className="w-20 h-10 bg-card-foreground"/>
      </div>
      <Skeleton className="h-30 w-full bg-card-foreground"/>
    </div>
  )
}

export default MainSectionSkeleton