import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { AppFooter } from "@/components/AppFooter";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useState } from "react";
import { useNetwork } from "@/hooks/useNetwork";
import { OfflineView } from "@/components/OfflineView";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  const { songs } = usePlayerStore();
  const isOnline = useNetwork();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const location = useLocation();
  const isPlaylistRoute = location.pathname.includes('/playlist/');
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
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
        {/* El Aside puede estar deshabilitado o simplificado en modo offline */}
        <Aside 
          isAsideMinimized={false}
          toggleAside={dummyToggleAside}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar pb-16 transition-all duration-300">
          
          {/* LÓGICA DE CONEXIÓN */}
          {!isOnline ? (
            !isPlaylistRoute ? <OfflineView /> : <Outlet />
          ) : (
            <Outlet />
          )}
          <AppFooter/>
        </div>

        

        {songs.length > 0 && (
          <FloatingPlayer />
        )}

      </main>
    </div>
  );
}

export default Home;