import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { AppFooter } from "@/components/AppFooter";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useState } from "react";
import { Menu } from "lucide-react";

function Home() {
  const { currentSong } = usePlayerStore();
  const [isAsideMinimized, setIsAsideMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideMinimized(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  return (
    <div className="flex flex-col w-screen h-screen">

      <header className="shrink-0">
        <NavBar 
          toggleMobileMenu={toggleMobileMenu} 
          isAsideMinimized={isAsideMinimized}
        />
      </header>

      <main className="overflow-hidden flex flex-1">
        <Aside 
          isAsideMinimized={isAsideMinimized} 
          toggleAside={toggleAside} 
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar pb-16 transition-all duration-300 ease-in-out">
          <div className={`hidden md:flex justify-end p-2 ${isAsideMinimized ? 'mr-0' : 'mr-2'}`}>
              <button 
                onClick={toggleAside} 
                className="text-white hover:text-primary transition-colors focus:outline-none"
                title={isAsideMinimized ? "Expandir Menú" : "Minimizar Menú"}
              >
                <Menu className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${isAsideMinimized ? 'rotate-180' : ''}`} />
              </button>
          </div>
          
          <Outlet />
          <footer>
            <AppFooter />
          </footer>
        </div>
        {currentSong && (
          <FloatingPlayer />
        )}
        
      </main>
    </div>
  );
}

export default Home;
