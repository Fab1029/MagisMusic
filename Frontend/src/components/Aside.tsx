import InfoCard from "./InfoCard";
import ListItemCard from "./ListItemCard";
import icons from "@/constants/icons";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { InlineSearch } from "./InlineSearch";
import { createJam } from "../services/jam";
import { X } from "lucide-react";
import  type React from "react";
import { useJamStore } from "@/store/useJamStore";
import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useAuth } from "@/providers/authProvider";
import { useUserPlaylists, useCreatePlaylist } from "@/hooks/useUserPlaylists";
import { useSearchStore } from "@/store/useSearchStore";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useEffect } from "react";
import type { Playlist } from "@/store/usePlaylistStore";

interface AsideProps {
  isAsideMinimized: boolean;
  toggleAside: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  className?: string;
}

const Aside: React.FC<AsideProps> = ({
  isAsideMinimized,
  toggleAside,
  isMobileMenuOpen,
  toggleMobileMenu,
  className,
}) => {
  const items_agregar = [
    { label: "Playlist", description: "Crea una lista de reproducción" },
    { label: "Carpeta", description: "Organiza tus listas de reproducción" },
    { label: "Jam", description: "Escuchen juntos desde cualquier lugar" },
  ];

  const items_recientes = [
    { label: "Sort by", disabled: true },
    { label: "Recientes" },
    { label: "Añadidos Recientes" },
    { label: "Alfabético" },
  ];

  const navigate = useNavigate();
  const { query, setQuery } = useSearchStore();

  const {isLoggedIn, user, accessToken} = useAuth();

  const { replaceQueue } = usePlayerStore();
  const { idJam, connectToJam, setIsDialogOpen, setURI } = useJamStore();
  
  const {data: playlists, isLoading, error} = useUserPlaylists(accessToken ?? null);
  const { mutate: createPlaylist, isPending } = useCreatePlaylist(accessToken!);

  const { playlists: storedPlaylists, setPlaylists, setCurrentPlaylist } = usePlaylistStore();
  const baseOptions = ["Playlist", "Artistas"];
  const optionsButtonPill = idJam ? [...baseOptions, "Jam"] : baseOptions;

  useEffect(() => {
    if (playlists) {
      setPlaylists(playlists);
    }
  }, [playlists]);

  const crearPlaylist = () => {
    if (isLoggedIn) {
      const playlistNumber = (playlists?.length ?? 0) + 1;
      const defaultName = `My Playlist #${playlistNumber}`;
      createPlaylist(defaultName, {
        onSuccess: (newPlayList) => {
        const normalizedPlaylist: Playlist = {
          id: newPlayList.id, 
          name: newPlayList.name,
          tracks: [] 
        };

 
        setPlaylists([...storedPlaylists, normalizedPlaylist]);
        setCurrentPlaylist(normalizedPlaylist.id);
        
        navigate(`/playlist/${normalizedPlaylist.id}`);
          /*setPlaylists([...storedPlaylists, newPlayList]);
          setCurrentPlaylist(newPlayList.id);
          navigate(`/playlist/${newPlayList.id}`);*/
        }
      });
    } else {
      navigate('/login')
    }
  }

  const explorarPodcast = () => {
    setQuery("podcasts")
    navigate('/search/podcasts/Todo')
  }

  const crearCarpeta = () => console.log("Crear carpeta");

  const crearJam = async () => {
    console.log("Crear Jam");
    try {
      const res = await createJam();
      console.log(res);
      const jamId = res.jamId;
      console.log("Jam creado:", jamId);

      connectToJam(jamId);
      
      /* Determinar URI */
      setURI(res.link);
      /* Limpiar cola de reproducción */
      replaceQueue([]);
      /* Mostrar dialogo */
      setIsDialogOpen(true);

      navigate(`/jam/${jamId}`);
    } catch (error) {
      console.error("Error creando Jam:", error);
    }
  };
 
  const handleFilterPlaylist = () => console.log("Filtro: Playlist");
  const handleFilterArtistas = () => console.log("Filtro: Artistas");

  const handleFilterJams = () => {
    if (idJam) navigate(`/jam/${idJam}`);
    else console.warn("No hay un Jam activo para mostrar.");
  };

  const accionesPill: Record<string, () => void> = {
    Playlist: handleFilterPlaylist,
    Artistas: handleFilterArtistas,
    Jam: handleFilterJams,
  };

  const acciones: Record<string, () => void> = {
    Playlist: crearPlaylist,
    Carpeta: crearCarpeta,
    Jam: crearJam,
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full overflow-y-auto custom-scrollbar pb-20
        bg-background transition-transform duration-300 ease-in-out transform
        w-full ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex md:flex-col md:m-2 md:p-2 md:rounded-md md:bg-card
        md:w-[28rem] md:shrink-0 md:gap-5
        ${className || ""}
      `}
    >
      {/* Encabezado */}
      <div className="flex flex-col gap-3 p-3 md:p-0 md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center w-full md:w-auto p-1 md:p-0">
          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            className="md:hidden p-0 w-8 h-8 hover:bg-transparent hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </Button>

          <h1 className="font-bold transition-opacity duration-300 text-lg opacity-100 md:inline">
            Tu biblioteca
          </h1>

          {/* Móvil: botón de crear */}
          <div className="md:hidden">
            <TooltipDropdownButton
              trigger={
                <Button
                  variant="pill"
                  className="bg-card p-2 rounded-full gap-3 w-8 h-8 flex justify-center items-center"
                >
                  <img className="w-5 h-5" src={icons.agregarIcon} alt="Opciones" />
                </Button>
              }
              infoHover="Crear playlist, carpeta o jam"
              menuItems={items_agregar}
              onSelect={(item) => acciones[item.label]?.()}
            />
          </div>
        </div>

        {/* Escritorio: botón de crear */}
        <div className="hidden md:block">
          <TooltipDropdownButton
            trigger={
              <Button
                variant="pill"
                className="bg-card p-2 rounded-full gap-3 transition-all duration-300 w-auto"
              >
                <img className="w-5 h-5" src={icons.agregarIcon} alt="Opciones" />
                <span className="font-bold">Create</span>
              </Button>
            }
            infoHover="Crear playlist, carpeta o jam"
            menuItems={items_agregar}
            onSelect={(item) => acciones[item.label]?.()}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div
        className={`
          flex flex-col gap-3 md:gap-8 transition-opacity duration-300 px-3
          opacity-100 md:block
        `}
      >
        {/* Filtros tipo “pill” */}
        {isLoggedIn && (
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-3 flex-wrap">
              {optionsButtonPill.map((btn) => (
                <Button key={btn} variant="pill" onClick={accionesPill[btn]}>
                  {btn}
                </Button>
              ))}
            </div>
          

            {/* Búsqueda + filtro */}
            <div className="flex justify-between">
              <InlineSearch />
              <CustomDropdownMenu
                trigger={<Button variant="pillHoverSecondary">Recientes</Button>}
                menuItems={items_recientes}
                />
            </div>
          </div>
        )}

        {/* Lista de playlists */}
        {(isLoggedIn && storedPlaylists?.length > 0) && 
          <div className="flex flex-col gap-4">
            {storedPlaylists.map((pl) => (
              <ListItemCard 
                key={pl.id}
                name = {pl.name}
                description={`Playlist • ${user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}`}
                onPress={() => {
                  setCurrentPlaylist(pl.id)
                  navigate(`/playlist/${pl.id}`)
                }}
              />
            ))}
          </div>
        }

         {/* Info Cards */}
        <div className="flex flex-col gap-4 mx-1 mt-4">
          {(!isLoggedIn || (playlists && playlists.length == 0)) && (
            <InfoCard
              title="Crea tu primera playlist"
              description="Es muy fácil! Te vamos a ayudar"
              textButton="Crear playlist"
              onPress={crearPlaylist}
              />
          )}

          <InfoCard
            title="Busquemos algunos podcast para seguir"
            description="Te mantendremos al tanto de los nuevos episodios"
            textButton="Explorar podcast"
            onPress={explorarPodcast}
          />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
