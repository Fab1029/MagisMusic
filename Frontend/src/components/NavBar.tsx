import icons from "@/constants/icons"
import { useRef } from "react"

const NavBar = () => {
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    inputRef.current?.focus(); 
  };

  return (
    <nav className="px-6 py-4 flex items-center justify-between">
      
      <button className="w-10 h-10 flex items-center justify-center cursor-pointer">
        <img className="w-full h-full object-contain" src={icons.magisMusicIcon} alt="Icon Magis Music"/>
      </button>

      <div className="gap-2 flex">
        <button className="p-2 flex items-center justify-end cursor-pointer rounded-full bg-card" >
          <img className="w-8 h-8 object-contain" src={icons.homeIcon} alt="Icon Home"/>
        </button>
          
        <button className="p-3 flex items-center gap-5 rounded-full 
          transition-all duration-300 ease-in-out
          focus-within:ring-2 focus-within:ring-primary
          bg-card backdrop-blur-md cursor-pointer"
          onClick={handleFocusInput}
          
        >
          <img className="w-7 h-7 object-contain" src={icons.searchIcon}/>
          <input 
            ref={inputRef}
            className="focus:outline-none w-md text-secondary font-regular" 
            placeholder="¿Qué quieres escuchar?"
          />
        </button>  
        
      </div>

      <div className="flex gap-5">
        <button 
          className="text-secondary font-semibold hover:scale-110 hover:text-primary-foreground
          transition-all duration-300 ease-in-out cursor-pointer">
          Registrate
        </button>
        <button
          className="text-black bg-white px-5  py-3 rounded-full font-semibold hover:scale-110
          transition-all duration-300 ease-in-out cursor-pointer"
        >
          Inicia sesión
        </button>
      </div>

    </nav>
  )
}

export default NavBar
