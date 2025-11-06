import { Skeleton } from "./ui/skeleton"

interface MiniatureCardSkeletonProps {
    className?:any;
}

function MiniatureCardSkeleton({className}: MiniatureCardSkeletonProps) {
  return (
    <div className={`gap-2 flex flex-col p-5 ${className}`}>
        <Skeleton className="h-20 w-20"/>
        <Skeleton className="h-5 w-15"/>
        <Skeleton className="h-3 w-10"/>
    </div>
  )
}

export default MiniatureCardSkeleton