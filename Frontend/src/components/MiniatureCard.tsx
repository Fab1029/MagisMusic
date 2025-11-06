import icons from "@/constants/icons";
import { Button } from "./ui/button";

export interface MiniatureCardProps {
  title:string;
  clasName?:any;
  image: string;
  subtitle?:string;
  isProfile?: boolean;
  onCardClick: () => void;
  onPlayClick?: () => void;
}

function MiniatureCard({isProfile = false, title, subtitle, image, clasName, onCardClick, onPlayClick}: MiniatureCardProps) {
  return (
    <div 
      onClick={onCardClick}
      className={`${clasName} w-40 group p-3 flex flex-col items-center justify-center transition-all ease-in-out duration-300 hover:bg-card-foreground cursor-pointer rounded-lg`}
    >   
      <div className="relative">
        <img 
          className={`w-30 h-30 object-contain ${isProfile ? 'rounded-full': 'rounded-sm'}`} 
          src={image}
        />
        
        <Button
          variant={'play'}
          className="w-12 h-12 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 absolute -bottom-1 -right-1"
        >
          <img 
            className="object-contain" 
            src={icons.playIcon}
            alt="Play"
          />
        </Button>
      

      </div>
      <div className="w-full mt-2 self-start">
        <h3 className="text-base font-bold truncate text-left">{title}</h3>
        <p className="text-sm text-secondary truncate text-left">{subtitle}</p>
      </div>
    </div>
  )
}

export default MiniatureCard
