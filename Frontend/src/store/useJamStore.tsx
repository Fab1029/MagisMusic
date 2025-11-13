import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import type { Track } from "@/models/Track";
import { usePlayerStore } from "@/store/usePlayerStore";

interface JamState {
  idJam: string;
  socket: Socket | null;
  //jamQueue: Track[];
  //currentSong: Track | null;

  connectToJam: (idJam: string) => void;
  leaveJam: () => void;
  addSongToQueue: (song: Track) => void;
  clearQueue: () => void;
  setCurrentSong: (song: Track | null) => void;
}

export const useJamStore = create<JamState>((set, get) => ({
  idJam: "",
  socket: null,
  jamQueue: [],
  currentSong: null,

  addSongToQueue: (song) =>
    set((state) => ({ jamQueue: [...state.jamQueue, song] })),

  clearQueue: () => set({ jamQueue: [] }),

  setCurrentSong: (song) => set({ currentSong: song }),

  connectToJam: (idJam) => {
    const existingSocket = get().socket;

    if (existingSocket?.connected && get().idJam === idJam) {
      console.log("Ya conectado a este Jam.");
      return;
    }

    // Desconecta si hay otro socket
    existingSocket?.disconnect();

    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    // Guarda inmediatamente en el store
    set({ idJam, socket });

    /* Cuando el jam se conecte borrar songs */
    const player = usePlayerStore.getState();
    player.setSongs([]);

    socket.emit("joinJam", idJam );

    socket.on("joined_ack", (msg) => {
      console.log("Conectado al jam:", msg);
    });

    // Centralizacion de eventos
    socket.on("jamEvent", (event) => {
      console.log("Evento de Jam recibido:", event);

      //const { addSongToQueue, setCurrentSong } = get();
      const player = usePlayerStore.getState();

      switch (event.type) {
        case "ADD_SONG":
          if (event.data){
            const startIndex = player.songs.length;
            console.log(startIndex, player.songs);
            player.setSongs([...player.songs, ...event.data], startIndex);
          } 
          break;

        case "PLAY_SONG":
          if (event.index) {
            player.setSongs(player.songs, event.index);
          }
          break;

        case "PAUSE_SONG":
          console.log("Reproducción pausada globalmente.");
          break;

        default:
          console.warn("Evento desconocido:", event);
      }
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del Jam.");
      set({ idJam: "", socket: null });
    });
  },

  leaveJam: () => {
    const { socket, idJam } = get();
    if (socket && idJam) {
      socket.emit("leave_jam", idJam);
      socket.disconnect();
    }
    set({ idJam: "", socket: null, jamQueue: [], currentSong: null });
  },
}));
