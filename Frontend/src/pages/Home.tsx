import FilterView from "@/components/FilterView"
import NavBar from "@/components/NavBar"

function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      
      {/* NAV FIJO EN LA PARTE SUPERIOR */}
      <header className="shrink-0">
        <NavBar />
      </header>
      
      {/* MAIN OCUPA EL RESTANTE */}
      <main className="flex flex-1 overflow-hidden">
        
        <aside className="w-100 shrink-0 bg-card m-2 p-2 rounded-md">
          {/* Componente lateral */}
          <div className="h-full flex items-center justify-center">
            ASIDE
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1 flex flex-col gap-5 overflow-y-auto bg-card m-2 p-2 rounded-md custom-scrollbar">
          {/* Implementar algo para poder enrutar mediante query params*/}
          {/*<MainView/>*/}
          {/*<SongsPanel columns={columns} data={songs}/>*/}
          {<FilterView/>}

          <footer>
          </footer>

        </div>
      </main>
    </div>
  )
}

export default Home