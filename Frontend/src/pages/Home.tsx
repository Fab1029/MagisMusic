import FilterView from "@/components/FilterView";
import MainView from "@/components/MainView";
import NavBar from "@/components/NavBar";
import { filters } from "@/store/useSearchStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [isMainView, setIsMainView] = useState(true);

  useEffect(() => {
    const { search } = location;
    const regex = /^\?search=([^/]+)\/([^/]+)$/;

    const match = search.match(regex);

    if (match) {
      const decodedFilter = search.split('/')[1];

      if (filters.includes(decodedFilter)) {
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
        <aside className="w-100 shrink-0 bg-card m-2 p-2 rounded-md">
          <div className="h-full flex items-center justify-center">
            ASIDE
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar">
          {isMainView ? <MainView /> : <FilterView />}
          <footer>

          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home;
