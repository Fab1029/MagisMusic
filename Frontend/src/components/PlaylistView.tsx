import { useAuth } from "@/providers/authProvider"
import icons from "@/constants/icons";
import { CustomTable } from "./CustomTable";
import { columns, columnsMobile } from "./Columns";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePlayerStore } from "@/store/usePlayerStore";

export default function PlaylistView () {
  const {user} = useAuth();
  const isMobile = useIsMobile();
  const { songs } = usePlayerStore();

  return (
    <div>
      <div className="p-4 sm:p-5 relative">
        <div className="bg-primary mask-b-from-gray-50 absolute inset-0 z-0 rounded-tl-md" />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-end-safe relative z-1">

          <img className="w-24 h-24 sm:w-64 sm:h-64 rounded-md" src={icons.jamIcon} alt="Jam Icon" />
          <div className="gap-2 sm:gap-5 flex flex-col min-w-0 flex-1">
            
            <h1 className="font-bold text-white truncate text-4xl max-w-70 md:text-7xl md:max-w-xl">
              Nombre playlist
            </h1>
            <h3 className="font-bold text-accent-foreground text-xl truncate max-w-70 md:text-2xl md:max-w-xl">
              {user?.user_metadata?.full_name?.split(' ')[0] || user?.email}
            </h3>
          </div>
        </div>
      </div>

      <CustomTable
        columns={isMobile ? columnsMobile : columns}
        data={songs}
      />
    </div>
  )
}