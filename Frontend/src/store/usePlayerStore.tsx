import type { Song } from "@/models/Track";
import { create } from "zustand";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progressSeconds: number; 
  volume: number;

  playPause: () => void;
  setSongs: (songs: [Song]) => void;
  setProgress: (seconds: number) => void;
  setVolume: (newVolume: number) => void;
  //Se puede añadir nextSong, prevSong, etc.
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: null,
  isPlaying: false,
  progressSeconds: 0,
  volume: 50,

  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSongs: (songs) => set({ currentSong: songs[0], progressSeconds: 0, isPlaying: true }),
  setProgress: (seconds) => set({ progressSeconds: seconds }),
  setVolume: (newVolume) => set({ volume: newVolume }),
}));