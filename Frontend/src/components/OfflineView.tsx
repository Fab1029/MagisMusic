import { useEffect, useState } from "react";
import { getOfflineTracks } from "@/lib/offlineDb";
import { CustomTable } from "./CustomTable";
import type{ Track } from "@/models/Track";

export const OfflineView = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    getOfflineTracks().then((data) => {
      console.log("Canciones recuperadas de IndexedDB:", data);
      setTracks(data);
    });
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
      <h2 className="text-xl font-bold mb-4">Mis Descargas</h2>
      {tracks.length > 0 ? (
        <CustomTable data={tracks} columns={offlineColumns} showHeaders={true} />
      ) : (
        <p>No se encontraron canciones offline</p>
      )}
    </div>
  );
};