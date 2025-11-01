import CustomCarousel from "./CustomCarousel"
import HeaderSection from "./HeaderSection"
import MiniatureCard from "./MiniatureCard"

function MainPanel() {
  return (
    <div>
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

    </div>
  )
}

export default MainPanel