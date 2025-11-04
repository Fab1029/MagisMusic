import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { AppFooter } from "@/components/AppFooter";

function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">

      <header className="shrink-0">
        <NavBar />
      </header>

      <main className="flex flex-1 overflow-hidden">
        <Aside />

        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar pb-16">

          <Outlet />
          <footer>
            <AppFooter />
          </footer>
        </div>

        <FloatingPlayer />
      </main>
    </div>
  );
}

export default Home;
