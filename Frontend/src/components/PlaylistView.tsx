import { useAuth } from "@/providers/authProvider"
import icons from "@/constants/icons";
import { CustomTable } from "./CustomTable";
import { columns, columnsMobile } from "./Columns";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TooltipDropdownButton } from "./TooltipDropdownButton";
import EditPlaylistDialog from "./EditPlaylistDialog";
import { useDeletePlaylist } from "@/hooks/useUserPlaylists";
import { useNavigate } from "react-router-dom";

export default function PlaylistView () {
  const { id } = useParams();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const { playlists, setCurrentPlaylist } = usePlaylistStore();
  const { replaceQueue } = usePlayerStore();

  const isMobile = useIsMobile();
  const [isEditOpen, setIsEditOpen] = useState(false)

  const playlist = playlists.find(p => p.id === Number(id));
  const {mutate: deletePlaylist} = useDeletePlaylist(accessToken!);
  const editarPlaylist = () => setIsEditOpen(true);
  const eliminarPlaylist = () => {
    if (!playlist) return;
    deletePlaylist(playlist.id, {
      onSuccess: () => {
        navigate('/')
      }
    })
  };

  const items = [{ label: "Editar"},{label: "Eliminar"}]
  const acciones: Record<string, () => void> = {
    Editar: editarPlaylist,
    Eliminar: eliminarPlaylist,
  };

  useEffect(() => {
    if (id) setCurrentPlaylist(Number(id));
  }, [id]);

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-[65vh] text-center gap-6">
        <img
          src={icons.jamIcon}
          alt="Playlist no encontrada"
          className="w-32 h-32 opacity-40"
        />

        <h1 className="text-3xl font-bold text-foreground">
          Esta playlist no existe
        </h1>

        <p className="text-muted-foreground max-w-md">
          Puede que haya sido eliminada o que el enlace no sea correcto.
          Intenta volver a tu biblioteca.
        </p>
      </div>
    );
  }



  return (
    <div>
      <EditPlaylistDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        playlistId={playlist.id}
        currentName={playlist.name}
      />

      <div className="p-4 sm:p-5 relative">
        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-end-safe relative z-1">

          <img className="w-24 h-24 sm:w-64 sm:h-64 rounded-md" src={icons.jamIcon} alt="Jam Icon" />
          <div className="gap-2 sm:gap-5 flex flex-col min-w-0 flex-1">
            
            <h1 
              className="font-bold text-white truncate text-4xl max-w-70 md:text-7xl md:max-w-xl cursor-pointer"
              onClick={() => setIsEditOpen(true)}
            >
              {playlist?.name}
            </h1>
            <h3 className="font-bold text-accent-foreground text-xl truncate max-w-70 md:text-2xl md:max-w-xl">
              {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
            </h3>
          </div>
        </div>

        
        <div className="mt-6 flex gap-4 relative z-1 items-center">
          <Button
            onClick={() => replaceQueue(playlist?.tracks ?? [])} 
            className="
              flex items-center justify-center 
              bg-primary rounded-full w-14 h-14 p-1
              transition-all duration-200 ease-out
              hover:scale-114 cursor-pointer
            "
          >
            <img 
              className="w-7 h-7 object-contain" 
              src={icons.playIcon}
              alt="Play"
            />
          </Button>
          
          <TooltipDropdownButton
            trigger={
              <Button variant="pill" className="p-0 rounded-full bg-transparent hover:bg-transparent hover:scale-105">
                <img src={icons.moreIcon} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" alt="Más opciones"/>
              </Button>
            }
            infoHover="Más opciones"
            menuItems={items}
            onSelect={(item) => acciones[item.label]?.()}
          />
          
        </div>
      </div>

      <CustomTable
        columns={isMobile ? columnsMobile : columns}
        data={playlist?.tracks ?? []}
      />
    </div>
  )
}