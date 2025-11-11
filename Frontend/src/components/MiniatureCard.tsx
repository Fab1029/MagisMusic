import icons from "@/constants/icons";
import { Button } from "./ui/button";
import { useJamStore } from "@/store/useJamStore";
import { errorToast } from "./CustomSonner";


export interface MiniatureCardProps {
  title:string;
  clasName?:any;
  image: string;
  subtitle?:string;
  isProfile?: boolean;
  onCardClick: () => void;
  onPlayClick: () => void;
}

function MiniatureCard({isProfile = false, title, subtitle, image, clasName, onCardClick, onPlayClick}: MiniatureCardProps) {
  const { idJam }  = useJamStore();

  const handleOnPlay = () => {
    if(idJam)
      errorToast(
        'No se puede reproducir en este momento',
        'Cierra el Jam actual para reproducir tus canciones'
      );
    else
      onPlayClick();  
  }

  return (
    <div 
      onClick={onCardClick}
      className={`${clasName} bg-card-foreground w-40 group p-3 flex flex-col items-center justify-center transition-all ease-in-out duration-300 md:hover:bg-card-foreground cursor-pointer rounded-lg`}
    >   
      <div className="relative">
        <img 
          className={`w-30 h-30 object-contain ${isProfile ? 'rounded-full': 'rounded-sm'}`} 
          src={image}
        />
        
        <Button
          variant={'play'}
          onClick={(e) => {
            e.stopPropagation();
            handleOnPlay();
          }}
          className="opacity-100 absolute bottom-4 right-1 md:opacity-0 w-12 h-12 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 md:-bottom-1 md:-right-1"
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
