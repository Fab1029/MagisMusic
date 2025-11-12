import { create } from "zustand";
import { Socket } from "socket.io-client";

interface SongData { 
    id: string | number;
    title: string;
    artist: string;
}

interface JamState {
  idJam: string;
  socket: Socket | null;
  jamQueue: SongData[];
  currentSong: SongData | null;

  setIdJam: (id: string) => void;
  setSocket: (socket: Socket | null) => void;
  addSongToQueue: (song: SongData) => void;
  clearQueue: () => void;
  setCurrentSong: (song: SongData | null) => void;
}

export const useJamStore = create<JamState>((set) => ({
  idJam: "",
  socket: null,
  jamQueue: [],
  currentSong: null,
  setIdJam: (idJam) => set({ idJam }),
  setSocket: (socket) => set({ socket }),
  addSongToQueue: (song) => set((state) => ({
    jamQueue: [...state.jamQueue, song]
  })),
  clearQueue: () => set({jamQueue: []}),
  setCurrentSong: (song) => set({ currentSong: song }),
}));
