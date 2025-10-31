import icons from "@/constants/icons"

interface MiniatureCard {
    isProfile?: boolean;
}

function MiniatureCard({isProfile = false}: MiniatureCard) {
  return (
    <button 
      className="group p-2 flex flex-col items-center justify-center transition-all ease-in-out duration-300 hover:bg-card cursor-pointer w-40 rounded-lg"
    >   
      <div className="relative">
        <img 
          className={`w-35 h-35 object-contain ${isProfile ? 'rounded-full': 'rounded-sm'}`} 
          src="https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"
        />

        <button 
          className="
            absolute bottom-2 right-2 
            flex items-center justify-center 
            bg-primary rounded-full w-12 h-12 p-1
            opacity-0 translate-y-5 
            transition-all duration-200 ease-out
            hover:scale-115
            group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer
          "
        >
          <img 
            className="w-6 h-6 object-contain" 
            src={icons.playIcon}
            alt="Play"
          />
        </button>

      </div>
      
      <div className="w-full mt-2 self-start">
        <h3 className="text-base font-bold truncate text-left">Rosalía</h3>
        <p className="text-sm text-secondary truncate text-left">Rosalía, Feat ROCU</p>
      </div>
    </button>
  )
}

export default MiniatureCard
