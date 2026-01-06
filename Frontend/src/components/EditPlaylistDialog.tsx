import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useUpdatePlaylist } from "@/hooks/useUserPlaylists"
import { useAuth } from "@/providers/authProvider"

interface Props {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  playlistId: number
  currentName: string
}

export default function EditPlaylistDialog({
  isOpen,
  setIsOpen,
  playlistId,
  currentName
}: Props) {
  const {accessToken} = useAuth();
  const [name, setName] = useState(currentName)
  const { mutate: updatePlaylist, isPending } = useUpdatePlaylist(accessToken!)

  useEffect(() => {
    setName(currentName)
  }, [currentName])

  const handleSave = () => {
    updatePlaylist(
      { playlistId, name },
      {
        onSuccess: () => setIsOpen(false)
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle>Editar playlist</DialogTitle>
        </DialogHeader>

        <input
          className="w-full bg-muted text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-xl text-base outline-none border border-transparent
          transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la playlist"
          autoFocus
        />

        <DialogFooter className="gap-2">
          <Button
            variant="play"
            onClick={handleSave}
            disabled={isPending || !name.trim()}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
