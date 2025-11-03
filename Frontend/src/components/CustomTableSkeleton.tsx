import { Skeleton } from "./ui/skeleton";

interface CustomTableSkeletonProps {
    rowsNumber:number;
}

const CustomTableSkeleton = ({rowsNumber}: CustomTableSkeletonProps) => {
  return (
    <div className="gap-5 flex flex-col justify-between">
      {Array.from({length: rowsNumber}, () => (
        <Skeleton className="w-full h-10"/>
      ))}
    </div>
  )
}

export default CustomTableSkeleton