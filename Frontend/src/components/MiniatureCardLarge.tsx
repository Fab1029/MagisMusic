import icons from "@/constants/icons"
import PlayButton from "./PlayButton";

interface MiniatureCardLargeProps {
	title:string;
  image: string;
  subtitle?:string;
  onCardClick: () => void;
  onPlayClick: () => void;
}

function MiniatureCardLarge({title, image, subtitle, onCardClick}: MiniatureCardLargeProps) {
  return (
    <div 
      onClick={onCardClick}
			className="group p-2 flex flex-col transition-all ease-in-out duration-300 backdrop-brightness-125 hover:bg-card-foreground cursor-pointer w-full rounded-lg relative"
		>   
			<img 
				className="w-35 h-35 object-contain rounded-sm" 
				src={image}
			/>

			<PlayButton 
        className={'bottom-10 right-15 w-15 h-15'} 
        child={(
          <img 
            className="w-8 h-8 object-contain" 
            src={icons.playIcon}
            alt="Play"
          />
        )} 
        onClick={() => {}}
      />
			
			<div className="w-full mt-2 self-start">
				<h3 className="font-bold truncate text-left text-lg">{title}</h3>
				<p className="text-sm text-secondary truncate text-left">{subtitle}</p>
			</div>
		</div>
  )
}

export default MiniatureCardLarge