import type { Song } from "@/models/Track";
import { create } from "zustand";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progressSeconds: number; 
  volume: number;

  songs: Song[];
  currentSongIndex: number;

  playPause: () => void;
  setSongs: (songs: Song[], index?: number) => void;
  setProgress: (seconds: number) => void;
  setVolume: (newVolume: number) => void;
  nextSong: () => void;
  prevSong: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  progressSeconds: 0,
  volume: 50,
  songs: [],
  currentSongIndex: -1,
  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setSongs: (songs, index = 0) => {
    
    if (songs.length === 0) return;

    set({ 
        songs: songs,
        currentSongIndex: index,
        currentSong: songs[index], 
        progressSeconds: 0, 
        isPlaying: true,
    });
  },
  
  setProgress: (seconds) => set({ progressSeconds: seconds }),
  setVolume: (newVolume) => set({ volume: newVolume }),

  nextSong: () => set((state) =>{
    const { songs,currentSongIndex} = state;
    if (songs.length === 0) return {};
    const nextIndex = (currentSongIndex + 1) % songs.length;
    return{
      currentSongIndex:nextIndex,
      currentSong: songs[nextIndex],
      progressSeconds: 0,
      isPlaying: true,
    };
  }),

  prevSong: () => set((state) => {
    const { songs, currentSongIndex } = state;
    if (songs.length === 0) return {};
    
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;

    return {
      currentSongIndex: prevIndex,
      currentSong: songs[prevIndex],
      progressSeconds: 0,
      isPlaying: true, 
    };
  }),

}));