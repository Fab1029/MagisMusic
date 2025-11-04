import FilterView from "@/components/FilterView";
import MainView from "@/components/MainView";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { filters, useSearchStore } from "@/store/useSearchStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FloatingPlayer } from "@/components/FloatingPlayer";
import { AppFooter } from "@/components/AppFooter";


function Home() {
  const location = useLocation();
  const { setQuery, setFilter } = useSearchStore();
  const [isMainView, setIsMainView] = useState(true);

  useEffect(() => {
    const { search } = location;
    const regex = /^\?search=([^/]+)\/([^/]+)$/;

    const match = search.match(regex);

    if (match) {
      const query = search.split('/')[0].split('=')[1];
      const decodedFilter = search.split('/')[1];

      if (filters.includes(decodedFilter)) {
        setQuery(query);
        setFilter(decodedFilter);
        setIsMainView(false);

        return;
      }
    }
    
    setIsMainView(true);
  }, [location]);

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* NAVBAR */}
      <header className="shrink-0">
        <NavBar />
      </header>

      {/* MAIN */}
      <main className="flex flex-1 overflow-hidden">
        <Aside/>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar pb-16">
          {isMainView ? <MainView /> : <FilterView />}
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
