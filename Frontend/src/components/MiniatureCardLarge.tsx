import icons from "@/constants/icons"

function MiniatureCardLarge() {
  return (
    <div 
			className="group p-2 flex flex-col transition-all ease-in-out duration-300 backdrop-brightness-125 hover:bg-card-foreground cursor-pointer w-full rounded-lg relative"
		>   
			<img 
				className="w-35 h-35 object-contain rounded-sm" 
				src="https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"
			/>

			<button 
				className="
					absolute bottom-10 right-10 
					flex items-center justify-center 
					bg-primary rounded-full w-15 h-15 p-1
					opacity-0 translate-y-5 
					transition-all duration-200 ease-out
					hover:scale-115
					group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer
				"
			>
				<img 
					className="w-8 h-8 object-contain" 
					src={icons.playIcon}
					alt="Play"
				/>
			</button>
			
			<div className="w-full mt-2 self-start">
				<h3 className="font-bold truncate text-left text-lg">Rosalía</h3>
				<p className="text-sm text-secondary truncate text-left">Rosalía, Feat ROCU</p>
			</div>
		</div>
  )
}

export default MiniatureCardLarge