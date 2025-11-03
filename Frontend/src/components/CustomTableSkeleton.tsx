import { Skeleton } from "./ui/skeleton";

interface CustomTableSkeletonProps {
    rowsNumber:number;
}

const CustomTableSkeleton = ({rowsNumber}: CustomTableSkeletonProps) => {
  return (
    <div className="gap-5 flex flex-col">
      {Array.from({length: rowsNumber}, () => (
        <Skeleton className="w-full h-10 bg-card-foreground"/>
      ))}
    </div>
  )
}

export default CustomTableSkeleton