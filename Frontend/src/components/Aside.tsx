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
import { useEffect, useState } from "react";
import type { Playlist } from "@/store/usePlaylistStore";
import { useUserArtistsLiked } from "@/hooks/useUserResources";

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
    { label: "Jam", description: "Escuchen juntos desde cualquier lugar" },
  ];

  const items_recientes = [
    { label: "Sort by", disabled: true },
    { label: "Recientes" },
    { label: "Añadidos Recientes" },
    { label: "Alfabético" },
  ];

  const navigate = useNavigate();
  const { setQuery } = useSearchStore();
  const {isLoggedIn, user, logout, accessToken} = useAuth();

  const { replaceQueue } = usePlayerStore();
  const { idJam, connectToJam, setIsDialogOpen, setURI } = useJamStore();
  
  const {data: playlists, isLoading: isLoadingPlaylists, error} = useUserPlaylists(accessToken ?? null);
  const { mutate: createPlaylist, isPending } = useCreatePlaylist(accessToken!);

  const { playlists: storedPlaylists, setPlaylists, setCurrentPlaylist } = usePlaylistStore();
  const baseOptions = ["Playlist", "Artistas"];
  const optionsButtonPill = idJam ? [...baseOptions, "Jam"] : baseOptions;

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { data:likedArtists, isLoading: isLoadingArtists} = useUserArtistsLiked(accessToken!);

  useEffect(() => {
    if (playlists) {
      setPlaylists(playlists);
    }
  }, [playlists]);
  console.log(accessToken);
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

  const crearJam = async () => {
    if (isLoggedIn) {
      console.log("Crear Jam");
      try {
        const res = await createJam(accessToken!);
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
        setActiveFilter("Jam");
        navigate(`/jam/${jamId}`);
      } catch (error) {
        console.error("Error creando Jam:", error);
      }
    } else {
      navigate('/login')
    }
  };
 
  const handleFilterPlaylist = () => {
    setActiveFilter(activeFilter === "Playlist" ? null : "Playlist");
  }
  const handleFilterArtistas = () => {
    setActiveFilter(activeFilter === "Artistas" ? null : "Artistas");
  }

  const handleFilterJams = () => {
    if (idJam) {
      setActiveFilter(activeFilter === "Jam" ? null : "Jam");
      navigate(`/jam/${idJam}`);
    }
    else console.warn("No hay un Jam activo para mostrar.");
  };

  const accionesPill: Record<string, () => void> = {
    Playlist: handleFilterPlaylist,
    Artistas: handleFilterArtistas,
    Jam: handleFilterJams,
  };

  const acciones: Record<string, () => void> = {
    Playlist: crearPlaylist,
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
        <div className="flex flex-row items-center justify-between">
          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            className="md:hidden p-0 w-8 h-8 hover:bg-transparent hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </Button>

          {(isLoggedIn && user) ? (
            <div className="md:hidden">
              <CustomDropdownMenu
                trigger={
                  <div className="gap-1 flex items-center justify-center cursor-pointer">
                    <span className="text-sm text-secondary">
                      Hola,
                    </span>
                    <span className="text-sm text-secondary"> 
                      {user.user_metadata?.full_name?.split(' ')[0] || user.email}
                    </span>
                    {user?.user_metadata?.avatar_url && (
                      <img
                        className="w-10 h-10 rounded-full object-contain"
                        src={user?.user_metadata?.avatar_url}
                      />
                    )}
                    
                  </div>
                }
                menuItems={[{label: 'Cerrar sesion', onClick: async() => {await logout()}}]}
              />
            </div>
          ): (
            <div className="flex gap-5 md:hidden">
              <Button onClick={() => navigate('/register')} variant="pillHoverSecondary" className="text-xs py-5">Registrate</Button>
              <Button onClick={() => navigate('/login')} variant="pillHover" className="text-xs py-5">Inicia sesión</Button>
            </div>
          )}
          
        </div>
        

        <div className="flex justify-between items-center w-full md:w-auto p-1 md:p-0">
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
              infoHover="Crear playlist o jam"
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
            infoHover="Crear playlist o jam"
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
                <Button key={btn} variant={activeFilter === btn ? "pillHover" : "pill"} onClick={accionesPill[btn]}>
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
        {isLoadingPlaylists ? (
          <p className="ml-2 mb-2 text-s text-muted-foreground animate-pulse">Cargando playlists...</p>
        ) : (
          isLoggedIn && storedPlaylists?.length > 0 && (activeFilter == "Playlist" || !activeFilter)) && 
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

        {/* Lista de artistas */}
        {isLoadingArtists ? (
          <p className="ml-2 text-s text-muted-foreground animate-pulse">Cargando artistas...</p>
        ) : (
        isLoggedIn && likedArtists && likedArtists.length > 0 && (activeFilter == "Artistas" || !activeFilter)) && 
          <div className="flex flex-col gap-4">
            {likedArtists.map((ar) => (
              <ListItemCard 
                key={ar.id}
                name = {ar.name}
                description={'Artista'}
                image= {ar.image}
                onPress={() => {
                  navigate(`/playlist/${ar.id}`)
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
