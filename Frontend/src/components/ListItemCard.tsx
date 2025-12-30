import { Download } from "lucide-react";
import type { Track } from "@/models/Track";
import { downloadTrack } from "@/services/deezer";
import { toast } from "sonner";
import { useState } from "react";

export interface ListItemProps {
  name?: string;
  description?: string;
  imageUrl?: string;
  track?: Track;
}

function ListItemCard({ name, description, imageUrl, track }: ListItemProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const displayName = track ? track.title : name;
  const displayDescription = track ? track.artist : description;
  const displayImage = track ? track.image : (imageUrl || "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16");

  const handleDownload = async (e: React.MouseEvent) => {
    if (!track) return;
    e.stopPropagation();
    
    setIsDownloading(true);
    try {
      await downloadTrack(track);
      toast.success(`${track.title} disponible offline`);
    } catch (err) {
      toast.error("Error al descargar");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center p-3 rounded-lg shadow-md gap-4 transition-all hover:shadow-lg group">
      <img 
        className="w-10 h-10 object-cover rounded" 
        src={displayImage} 
        alt={displayName} 
      />
      
      <div className="flex-1">
        <h2 className="text-sm font-bold text-foreground line-clamp-1">
          {displayName}
        </h2>
        <p className="text-xs text-foreground/80 line-clamp-1">
          {displayDescription}
        </p>
      </div>

      {/* Solo se muestra el boton si existe un objeto track real */}
      {track && (
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className={`
            p-2 hover:text-primary transition-opacity
            ${isDownloading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          <Download className={`h-4 w-4 ${isDownloading ? "animate-pulse text-primary" : ""}`} />
        </button>
      )}
    </div>
  );
}

export default ListItemCard;