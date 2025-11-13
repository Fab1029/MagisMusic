import type { Track } from "@/models/Track";
import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  progressSeconds: number; 
  volume: number;

  songs: Track[];
  currentSongIndex: number;

  playPause: () => void;
  setSongs: (newSongs: Track[], startindex?: number) => void;
  replaceQueue: (songs: Track[], index?: number) => void;
  setProgress: (seconds: number) => void;
  setVolume: (newVolume: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  addSong: (song: Track) => void; 
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  
  isPlaying: false,
  progressSeconds: 0,
  volume: 50,
  songs: [],
  currentSongIndex: 0,
  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setSongs: (newSongs: Track[]) => {
    set((state) => {
        
        const startNewIndex = state.songs.length;
        const updatedSongs = [...state.songs, ...newSongs];
        const finalCurrentIndex = startNewIndex;
        
        if (newSongs.length === 0 || updatedSongs.length === 0) return {};

        return { 
            songs: updatedSongs, 
            currentSongIndex: finalCurrentIndex,
            progressSeconds: 0, 
            isPlaying: true,
        };
    });
  },

  replaceQueue: (newSongs: Track[], index = 0) => {
    if (newSongs.length === 0) return;
    
    set({
        songs: newSongs,
        currentSongIndex: index,
        progressSeconds: 0,
        isPlaying: true,
    });
  },
  
  addSong: (song: Track) => {
    set((state) => {
        const newSongs = [...state.songs, song];
        const newIndex = state.songs.length === 0 ? 0 : state.currentSongIndex;
        
        return {
            songs: newSongs,
            currentSongIndex: newIndex,
            isPlaying: state.songs.length === 0 ? true : state.isPlaying,
        };
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