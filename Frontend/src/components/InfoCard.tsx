import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export interface InfoCardProps {
  title?: string;
  description?: string;
  textButton?: string;
  className?: string;
}

function InfoCard({
  title,
  description,
  textButton,
  className,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "bg-input p-3 rounded-lg shadow-md flex flex-col gap-4 transition-all hover:shadow-lg",
        className
      )}
    >

      {title && <h2 className="text-l font-bold text-foreground">{title}</h2>}

      {description && (
        <p className="text-sm text-foreground/80">{description}</p>
      )}

      <Button variant="pillHover" className="inline-flex w-auto self-start">{textButton}</Button>
    </div>
  );
}

export default InfoCard;
