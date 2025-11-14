import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { usePlayerStore } from "@/store/usePlayerStore";

interface JamState {
  uri: string;
  idJam: string;
  isDialogOpen: boolean;
  socket: Socket | null;

  leaveJam: () => void;
  setURI: (uri: string) => void;
  connectToJam: (idJam: string) => void;
  setIsDialogOpen: (value: boolean) => void;
  requestControlEvent: (eventType: 'PLAY_SONG' | 'PAUSE_SONG', index?: number) => void;
  requestAddSong: (songData: any) => void;
}

export const useJamStore = create<JamState>((set, get) => ({
  uri: "",
  idJam: "",
  socket: null,
  isDialogOpen: false,
 
  
  setIsDialogOpen: (value) => {
    set({
      isDialogOpen: value
    })
  },

  setURI: (uri) => {
    set({
      uri: uri
    })
  },

  connectToJam: (idJam) => {
    const existingSocket = get().socket;

    if (existingSocket?.connected && get().idJam === idJam) {
      return;
    }

    // Desconecta si hay otro socket
    existingSocket?.disconnect();

    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"],
    });

    set({ idJam, socket });

    socket.emit("joinJam", idJam );

    // Centralizacion de eventos de escucha
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
          if (event.index !== undefined && event.index !== null) {
            player.replaceQueue(player.songs, event.index);            
          } else {
            player.togglePlaying();
          }
          break;

        case "PAUSE_SONG":
          player.togglePlaying();
          break;

        case "NEXT_SONG":
          player.togglePlaying();
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

  requestControlEvent: (eventType, index) => {
    const { idJam, socket } = get();
    if (idJam && socket?.connected) {
      console.log(`[JamRequest] Enviando evento ${eventType}`);
      socket.emit("jamEvent", {
        jamId: idJam,
        event: { type: eventType, index },
      });
    }
  },

  requestAddSong: (songData) => {
    const { idJam, socket } = get();
    if (idJam && socket?.connected) {
      console.log(`[JamRequest] Añadiendo canción: ${songData.title}`);
      socket.emit("jamEvent", {
        jamId: idJam,
        event: { type: "ADD_SONG", data: songData },
      });
    }
  },

  leaveJam: () => {
    set((state) => {
      
      if (state.socket && state.idJam){
        state.socket.emit("leave_jam", state.idJam);
        state.socket.disconnect();
        usePlayerStore.getState().replaceQueue([]);
      }

      return {
        uri: '',
        idJam: '',
        socket: null,
        isDialogOpen: false
      }
    })
  },
}));
