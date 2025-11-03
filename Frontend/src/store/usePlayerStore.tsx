import { create } from "zustand";

interface Song {
  id: string;
  title: string;
  artist: string;
  durationSeconds: number;
  imageSrc: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progressSeconds: number; 
  volume: number;

  playPause: () => void;
  setSong: (song: Song) => void;
  setProgress: (seconds: number) => void;
  setVolume: (newVolume: number) => void;
  //Se puede añadir nextSong, prevSong, etc.
}

const initialSong: Song = {
    id: "1",
    title: "Droga",
    artist: "Mora",
    durationSeconds: 266, // 4:26
    imageSrc: "https://i.scdn.co/image/ab67616d00001e0208256748d3e6c3ed016cab16"
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: initialSong,
  isPlaying: false,
  progressSeconds: 0,
  volume: 50,

  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSong: (song) => set({ currentSong: song, progressSeconds: 0, isPlaying: true }),
  setProgress: (seconds) => set({ progressSeconds: seconds }),
  setVolume: (newVolume) => set({ volume: newVolume }),
}));