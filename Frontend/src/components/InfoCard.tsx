import { cn } from "@/lib/utils";

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
      {/* Título */}
      {title && <h2 className="text-l font-bold text-foreground">{title}</h2>}

      {/* Descripción */}
      {description && (
        <p className="text-sm text-foreground/80">{description}</p>
      )}

      <button
          className="inline-flex w-auto self-start px-2 text-black bg-white py-1 rounded-full font-semibold hover:scale-102
          transition-all duration-300 ease-in-out cursor-pointer"
        >
          {textButton}
        </button>
    </div>
  );
}

export default InfoCard;
