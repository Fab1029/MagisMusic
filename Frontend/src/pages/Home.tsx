import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { AppFooter } from "@/components/AppFooter";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useState } from "react";

function Home() {
  const { currentSong } = usePlayerStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const dummyToggleAside = () => {}; 

  return (
    <div className="flex flex-col w-screen h-screen">

    <header className="shrink-0">
       <NavBar 
        toggleMobileMenu={toggleMobileMenu} 
        isAsideMinimized={false} 
      />
    </header>

    <main className="overflow-hidden flex flex-1">
      <Aside 
        isAsideMinimized={false}
        toggleAside={dummyToggleAside}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar pb-16 transition-all duration-300 ease-in-out">
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