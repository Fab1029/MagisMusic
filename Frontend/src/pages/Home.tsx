import CustomCarousel from "@/components/CustomCarousel"
import HeaderSection from "@/components/HeaderSection"
import MiniatureCard from "@/components/MiniatureCard"
import NavBar from "@/components/NavBar"



function Home() {
  return (
    <div className="w-screen">
      
      <header>
        <NavBar/>
      </header>
      
      <main className="flex">

        <aside className="">
          {/* EL COMPONENTE DE BRYAN*/}
          <div className="w-xl">HOLA</div>
        </aside>

        <div className="gap-5 flex flex-col overflow-x-hidden">
          <section>
            <HeaderSection title="Canciones en tendencia"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard/>)}/>
          </section>

          <section>
            <HeaderSection title="Artistas"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard isProfile={true}/>)}/>
          </section>

          <section>
            <HeaderSection title="Álbumes"/> 
            <CustomCarousel data={Array.from({length: 10}, () => <MiniatureCard/>)}/>
          </section>


          <footer>

          </footer>
        </div>
        
      </main>
    </div>
  )
}

export default Home