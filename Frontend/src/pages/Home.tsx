import CustomCarousel from "@/components/CustomCarousel"
import Filter from "@/components/Filter"
import HeaderSection from "@/components/HeaderSection"
import MiniatureCard from "@/components/MiniatureCard"
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
          <section>
            <Filter/>
          </section>

          <section>
            <HeaderSection title="Canciones en tendencia"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard/>)} />
          </section>

          <section>
            <HeaderSection title="Artistas"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard isProfile={true}/>)} />
          </section>

          <section>
            <HeaderSection title="Álbumes"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard/>)} />
          </section>

          <section>
            <HeaderSection title="Play List"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard/>)} />
          </section>

          <footer>
          </footer>

        </div>
      </main>
    </div>
  )
}

export default Home