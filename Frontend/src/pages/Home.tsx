import MiniatureCard from "@/components/MiniatureCard"
import NavBar from "@/components/NavBar"


function Home() {
  return (
    <div>
      <header>
        <NavBar/>
      </header>

      <MiniatureCard/>
      <MiniatureCard isProfile={true}/>

    </div>
  )
}

export default Home