import { create } from "zustand";
import { usePlayerStore } from "@/store/usePlayerStore";
const BASE_URL = "/ws-jam/v1/jam"

interface JamState {
  uri: string;
  idJam: string;
  isDialogOpen: boolean;
  socket: WebSocket | null;

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

    // Si ya existe una conexión para este Jam, no hacer nada
    if (existingSocket?.readyState === WebSocket.OPEN && get().idJam === idJam) {
      return;
    }

    // Desconecta si hay otro socket
    if (existingSocket) {
      existingSocket?.close();
    }

    const wsUrl = `${BASE_URL}/${idJam}`
    const socket = new WebSocket(wsUrl)

    socket.onopen = () => {
      console.log("✅ Conectado al Jam via WebSocket");
      set({ idJam, socket });
    };

    // Centralizacion de eventos de escucha
    socket.onmessage = ((event) => {
      const data = JSON.parse(event.data);
      const player = usePlayerStore.getState();
      console.log("Evento de Jam recibido:", data);

      switch (data.type) {
        case "ADD_SONG":
          if (data.data){
            console.log(player.songs);
            player.addSong(data.data);
          } 
          break;

        case "PLAY_SONG":
          if (data.index !== undefined && data.index !== null) {
            player.replaceQueue(player.songs, data.index);            
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
          console.warn("Evento desconocido:", data.type);
      }
    });

    socket.onclose = () => {
      console.log("Desconectado del Jam.");
      set({ idJam: "", socket: null });
    };

    socket.onerror = (error) => {
      console.error("⚠️ Error en WebSocket:", error);
    };
  },

  requestControlEvent: (eventType, index) => {
    const { idJam, socket } = get();
    if (idJam && socket?.readyState === WebSocket.OPEN) {
      console.log(`[JamRequest] Enviando evento ${eventType}`);
      socket.send(JSON.stringify({
        type: eventType,
        index: index,
      }));
    }
  },

  requestAddSong: (songData) => {
    const { idJam, socket } = get();
    if (idJam && socket?.readyState === WebSocket.OPEN) {
      console.log(`[JamRequest] Añadiendo canción: ${songData.title}`);
      socket.send(JSON.stringify({
        type: "ADD_SONG",
        data: songData
      }));
    }
  },

  leaveJam: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
    }
    usePlayerStore.getState().replaceQueue([]);
    set({ uri: '', idJam: '', socket: null, isDialogOpen: false });
  },
}));
