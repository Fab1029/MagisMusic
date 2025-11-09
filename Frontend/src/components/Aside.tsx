import InfoCard from "./InfoCard";
import ListItemCard from "./ListItemCard";
import icons from "@/constants/icons";
import { Button } from "./ui/button"
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { InlineSearch } from "./InlineSearch";

const Aside = () => {
  const items_agregar = [
    { label: "Playlist", description: "Crea una lista de reproducción" },
    { label: "Carpeta", description: "Organiza tus listas de reproducción" },
    { label: "Jam", description: "Escuchen juntos desde cualquier lugar"},
  ]

  const items_recientes = [
    { label: "Sort by", disabled: true },
    { label: "Recientes" },
    { label: "Añadidos Recientes" },
    { label: "Alfabético" }
  ]

  const optionsButtonPill = ["Playlist", "Artistas", "Jams"];

  return (
    <aside className=" flex flex-col w-100 gap-5 shrink-0 bg-card m-2 p-2 rounded-md overflow-y-auto custom-scrollbar pb-20">
      <div className="flex items-center justify-between p-3">
        <h1 className="font-bold">Tu biblioteca</h1>

        <TooltipDropdownButton
          trigger={
            <Button variant="pill" className="bg-card p-2 rounded-full gap-3">
              <img className="w-5 h-5" src={icons.agregarIcon} alt="Opciones" />
              <span className="font-bold">Create</span>
            </Button>
          }
          infoHover="Crear playlist, carpeta o jam"
          menuItems={items_agregar}
        />
      </div>

      <div className="flex gap-3">
        {optionsButtonPill.map((btn, index) => (
          <Button key={index} variant="pill">{btn}</Button>
        ))
        }
      </div>

      <div className="flex justify-between px-4">
        <InlineSearch />
        <CustomDropdownMenu
          trigger = {
            <Button variant="pillHoverSecondary">
              Recientes
            </Button>
          }
          menuItems={items_recientes}
        />
      </div>

      <div>
        <ListItemCard name="Perreando evangelicas" description="Playlist • usuario"/>
        <ListItemCard name="Gorillaz" description="Artista"/>
      </div>

      <InfoCard 
        title="Crea tu primera playlist" 
        description="Es muy fácil! Te vamos a ayudar"
        textButton="Crear playlist"
        className="mx-2"
      />
      <InfoCard 
        title="Busquemos algunos podcast para seguir" 
        description="Te mantendremos al tanto de los nuevos episodios"
        textButton="Explorar podcast"
        className="mx-2"
      />
    </aside>
  )
}

export default Aside;