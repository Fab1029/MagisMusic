import { Skeleton } from "./ui/skeleton"

const MainSectionSkeleton = () => {
  return (
    <div className="w-full gap-5 flex flex-col">
      <div className="flex items-center justify-between">
        <Skeleton className="w-30 h-10"/>
        <Skeleton className="w-20 h-10"/>
      </div>
      <Skeleton className="h-30 w-full"/>
    </div>
  )
}

export default MainSectionSkeleton