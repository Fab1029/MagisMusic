import icons from "@/constants/icons"
import { filters, useSearchStore } from "@/store/useSearchStore";
import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface NavBarProps {
    toggleMobileMenu: () => void;
    isAsideMinimized: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ toggleMobileMenu, isAsideMinimized }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { query, setQuery } = useSearchStore();
  const filter = useLocation().pathname.split('/')[3] || filters[0];

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentPath = window.location.pathname;
      const isSearchRoute = currentPath.startsWith('/search');
      if (query.trim().length > 0) {
        navigate(`/search/${query.trim()}/${filter}`);
      }
      else if (isSearchRoute) {
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
    <nav className="flex items-center py-2 justify-around md:justify-between md:px-6 md:py-4">
      
      <Button 
        variant="default"
        onClick={handleBackToMain}
        className="w-12 h-12 p-0 md:w-16 md:h-16 flex items-center justify-center cursor-pointer bg-transparent hover:bg-transparent"
      >
        <img className="w-full h-full object-contain" src={icons.magisMusicIcon} alt="Icon Magis Music"/>
      </Button>

      <div className="gap-2 flex">
        <Button 
          variant="pill"
          onClick={handleBackToMain}
          className="hidden md:flex p-2 items-center justify-end cursor-pointer rounded-full bg-card transition-all duration-400 ease-in-out hover:bg-secondary h-full" 
        >
          <img className="w-8 h-8 object-contain" src={icons.homeIcon} alt="Icon Home"/>
        </Button>
        
        <button className="gap-3 md:gap-5 p-3 flex items-center rounded-full 
          transition-all duration-300 ease-in-out
          focus-within:ring-2 focus-within:ring-primary
          bg-card backdrop-blur-md cursor-pointer"
          onClick={() => inputRef.current?.focus()}
          
        >
          <img className="w-4 h-4 md:w-7 md:h-7 object-contain" src={icons.searchIcon}/>
          <input 
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-45 md:w-md focus:outline-none text-secondary font-regular" 
            placeholder="¿Qué quieres escuchar?"
          />
        </button>  
        
      </div>

      <Button 
        variant="default"
        onClick={toggleMobileMenu}
        className="w-6 h-6 p-0 flex items-center justify-center cursor-pointer bg-transparent hover:bg-transparent md:hidden"
      >
        <img className="w-full h-full object-contain" src={icons.menuIcon} alt="Icon Menu"/>
      </Button>

      <div className="hidden md:flex gap-5">
        <Button variant="pillHoverSecondary" className="text-md py-6">Registrate</Button>
        <Button variant="pillHover" className="text-md py-6">Inicia sesión</Button>
      </div>

    </nav>
  )
}

export default NavBar
