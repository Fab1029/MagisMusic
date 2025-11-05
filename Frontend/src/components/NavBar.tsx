import icons from "@/constants/icons"
import { filters, useSearchStore } from "@/store/useSearchStore";
import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { query, setQuery } = useSearchStore();
  const filter = useLocation().pathname.split('/')[3] || filters[0];

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 0) {
        navigate(`/search/${query.trim()}/${filter}`);
      }
      else {
        handleBackToMain();
      }
    }, 1000); 

    return () => clearTimeout(handler);
  }, [query]);



 
  const handleBackToMain = () => {
    navigate('/');
    setQuery('');
  };

  return (
    <nav className="px-6 py-4 flex items-center justify-between">
      
      <button 
        onClick={handleBackToMain}
        className="w-15 h-15 flex items-center justify-center cursor-pointer"
      >
        <img className="w-full h-full object-contain" src={icons.magisMusicIcon} alt="Icon Magis Music"/>
      </button>

      <div className="gap-2 flex">
        <button 
          onClick={handleBackToMain}
          className="p-2 flex items-center justify-end cursor-pointer rounded-full bg-card transition-all duration-200 ease-in-out hover:bg-secondary" 
        >
          <img className="w-8 h-8 object-contain" src={icons.homeIcon} alt="Icon Home"/>
        </button>
          
        <button className="p-3 flex items-center gap-5 rounded-full 
          transition-all duration-300 ease-in-out
          focus-within:ring-2 focus-within:ring-primary
          bg-card backdrop-blur-md cursor-pointer"
          onClick={() => inputRef.current?.focus()}
          
        >
          <img className="w-7 h-7 object-contain" src={icons.searchIcon}/>
          <input 
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
