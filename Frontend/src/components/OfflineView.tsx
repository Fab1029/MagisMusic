import { useEffect, useState } from "react";
import { CustomTable } from "./CustomTable";
import type{ Track } from "@/models/Track";
import { getOfflineIndividualTracks } from "@/lib/offlineDb";


export const OfflineView = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    getOfflineIndividualTracks().then(setTracks);
  }, []);

  const offlineColumns = [
    {
      accessorKey: "title",
      header: "Canción",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <img src={row.original.image} className="w-10 h-10 rounded" />
          <span>{row.original.title}</span>
        </div>
      )
    },
    {
      accessorKey: "artist",
      header: "Artista",
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Descargas</h2>
      <p className="text-sm text-muted-foreground mb-6">Canciones descargadas</p>
      {tracks.length > 0 ? (
        <CustomTable data={tracks} columns={offlineColumns} showHeaders={true} />
      ) : (
        <p>No tienes descargas</p>
      )}
    </div>
  );
};