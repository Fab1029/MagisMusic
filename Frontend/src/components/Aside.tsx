import { useState } from "react";
import InfoCard from "./InfoCard";
import ListItemCard from "./ListItemCard";
import icons from "@/constants/icons";
import { Button } from "./ui/button"

const Aside = () => {
  
  return (
    <aside className=" flex flex-col w-100 gap-5 shrink-0 bg-card m-2 p-2 rounded-md overflow-y-auto custom-scrollbar pb-20">
      <div className="flex items-center justify-between p-3">
        <h1 className="font-bold">Tu biblioteca</h1>
        <button className="rounded-full p-2 hover:bg-secondary transition-all duration-300 ease-in-out">
          <img 
            className="w-5 h-5"
            src={icons.agregarIcon} alt="" />
        </button>
      </div>

      <div className="flex gap-3">
        <Button variant="pill">Playlist</Button>
        <Button variant="pill">Artistas</Button>
      </div>

      <div className="flex justify-between px-4">
        <img className="w-4 h-4 object-contain" src={icons.searchIcon}/>
        <button 
          className="text-secondary font-semibold hover:scale-102 hover:text-primary-foreground
          transition-all duration-300 ease-in-out cursor-pointer">
          Recientes
        </button>
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