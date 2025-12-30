export interface ListItemProps {
  name: string;
  description: string;
  onPress?: () => void;
}

function ListItemCard ({
  name, 
  description,
  onPress,
} : ListItemProps) {
  return (
    <div
      className="flex p-3 rounded-lg shadow-md gap-4 transition-all hover:bg-input hover:shadow-lg"
      onClick={onPress}
    >
    
      <img className="w-10 h-10 object-contain" src="https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"/>
      
      <div>
        <h2 className="text-l font-bold text-foreground">{name}</h2>
        <p className="text-sm text-foreground/80">{description}</p>
      </div>

    </div>
  )
}

export default ListItemCard;
