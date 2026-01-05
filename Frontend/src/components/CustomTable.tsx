import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo } from "react";
import { useJamStore } from "@/store/useJamStore";
import { errorToast } from "./CustomSonner";
import type { Track } from "@/models/Track";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useLocation } from "react-router-dom";
import { Download, Loader2 } from "lucide-react";
import { downloadTrack } from "@/services/deezer";
import { toast } from "sonner";
import { useState } from "react";
import { useNetwork } from "@/hooks/useNetwork";
import { useAuth } from "@/providers/authProvider"; 
import { infoToast } from "./CustomSonner";
import { saveTrackOffline } from "@/lib/offlineDb";

interface CustomTableProps {
  data: Track[];
  columns: ColumnDef<Track, any>[];
  showHeaders?: boolean;
}

export function CustomTable({ data, columns, showHeaders = true }: CustomTableProps) {
  const { idJam, socket, requestControlEvent} = useJamStore();
  const { songs, currentSongIndex, replaceQueue } = usePlayerStore();
  const isJamPath = useLocation().pathname.split('/')[1] === 'jam' ? true : false
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);
  const isOnline = useNetwork()
  const { isLoggedIn } = useAuth();
  
  const handleDownload = async (e: React.MouseEvent, track: Track) => {
    e.stopPropagation(); 
    if (!isLoggedIn) {
      infoToast(
        'Acción no permitida',
        'Debes iniciar sesión para descargar'
      );
      return;
    }
    const trackId = String(track.id);
    setDownloadingIds(prev => [...prev, track.id]);
    
    try {
      await saveTrackOffline(track, true);
      toast.success(`${track.title} descargada para modo offline`);
    } catch (error) {
      toast.error("Error al descargar la canción");
    } finally {
      setDownloadingIds(prev => prev.filter(id => id !== trackId));
    }
  };
  
  const columnsWithId = useMemo<ColumnDef<Track, any>[]>(() => {
    const idColumn: ColumnDef<Track, any> = {
      id: "id_column",
      header: "#",
      cell: ({ row }) => row.index + 1,
    };

    const actionColumn: ColumnDef<Track, any> = {
      id: "actions",
      header: "Offline",
      cell: ({ row }) => {
        if (!isOnline) return null;
        const track = row.original;
        const isDownloading = downloadingIds.includes(String(track.id));

        return (
          <button
            onClick={(e) => handleDownload(e, track)}
            disabled={isDownloading}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white disabled:opacity-50"
          >
            {isDownloading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
          </button>
        );
      },
    };

    return [idColumn, ...columns, actionColumn];
  }, [columns, downloadingIds]);

  const table = useReactTable({
    data,
    columns: columnsWithId,
    getCoreRowModel: getCoreRowModel(),
  });
  

  const handleOnClickRow = (index: number) => {
    const isSocketOpen = socket?.readyState === WebSocket.OPEN;
    if (isJamPath) {
      if (idJam && isSocketOpen) 
        requestControlEvent("PLAY_SONG", index)
    }
    else {
      if (idJam &&isSocketOpen) 
        errorToast(
          "Error en reproducción",
          "Desvincúlate del jam para reproducir localmente"
        )
      else
        replaceQueue(data, index);
    }
    
  };


  return (
    <div className="overflow-hidden rounded-md">
      <Table>
        {showHeaders && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const song = row.original;
              const isSelected = song.id === songs[currentSongIndex]?.id;

              return (
                <TableRow
                  key={row.id}
                  onClick={() => handleOnClickRow(index)}
                  className={`border-0 cursor-pointer transition-all duration-200 ease-in-out ${
                    isSelected ? "bg-card-foreground" : "hover:bg-muted"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columnsWithId.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
