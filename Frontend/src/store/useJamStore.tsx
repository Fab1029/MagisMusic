import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { usePlayerStore } from "@/store/usePlayerStore";

interface JamState {
  idJam: string;
  socket: Socket | null;

  leaveJam: () => void;
  connectToJam: (idJam: string) => void;
}

export const useJamStore = create<JamState>((set, get) => ({
  idJam: "",
  socket: null,
 
  connectToJam: (idJam) => {
    const existingSocket = get().socket;

    if (existingSocket?.connected && get().idJam === idJam) {
      return;
    }

    // Desconecta si hay otro socket
    existingSocket?.disconnect();

    const socket = io("http://10.26.23.88:4000", {
      transports: ["websocket"],
    });

    set({ idJam, socket });

    socket.emit("joinJam", idJam );

    // Centralizacion de eventos
    socket.on("jamEvent", (event) => {
      const player = usePlayerStore.getState();
      console.log("Evento de Jam recibido:", event);

      switch (event.type) {
        case "ADD_SONG":
          if (event.data){
            console.log(player.songs);
            player.addSong(event.data);
          } 
          break;

        case "PLAY_SONG":
          if (event.index) {
            player.replaceQueue(player.songs, event.index);
          }
          break;

        case "PAUSE_SONG":
          player.playPause();
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
    set((state) => {
      
      if (state.socket && state.idJam){
        state.socket.emit("leave_jam", state.idJam);
        state.socket.disconnect();
      }

      return {
        idJam: '',
        socket: null
      }
    })
  },

}));
