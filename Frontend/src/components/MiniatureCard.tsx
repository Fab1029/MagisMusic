export interface MiniatureCardProps {
  child:any;
  title:string;
  clasName?:any;
  image: string;
  subtitle?:string;
  isProfile?: boolean;
  onCardClick: () => void;
  onPlayClick: () => void;
}

function MiniatureCard({isProfile = false, title, subtitle, image, child, clasName, onCardClick}: MiniatureCardProps) {
  return (
    <div 
      onClick={onCardClick}
      className={`${clasName} w-40 group p-3 flex flex-col items-center justify-center transition-all ease-in-out duration-300 hover:bg-card-foreground cursor-pointer rounded-lg relative`}
    >   
      <img 
        className={`w-30 h-30 object-contain ${isProfile ? 'rounded-full': 'rounded-sm'}`} 
        src={image}
      />
      {child}
      
      <div className="w-full mt-2 self-start">
        <h3 className="text-base font-bold truncate text-left">{title}</h3>
        <p className="text-sm text-secondary truncate text-left">{subtitle}</p>
      </div>
    </div>
  )
}

export default MiniatureCard
