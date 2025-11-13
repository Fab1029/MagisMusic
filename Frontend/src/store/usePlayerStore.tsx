import type { Track } from "@/models/Track";
import { create } from "zustand";
import { useJamStore } from "@/store/useJamStore";

interface PlayerState {
  isPlaying: boolean;
  progressSeconds: number; 
  volume: number;

  songs: Track[];
  currentSongIndex: number;

  playPause: () => void;
  togglePlaying: () => void;
  setSongs: (newSongs: Track[]) => void;
  replaceQueue: (songs: Track[], index?: number) => void;
  setProgress: (seconds: number) => void;
  setVolume: (newVolume: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  goNextSong: () => void;
  goPrevSong: () => void;
  addSong: (song: Track) => void; 
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  
  isPlaying: false,
  progressSeconds: 0,
  volume: 50,
  songs: [],
  currentSongIndex: 0,

  togglePlaying: () => {
    set((state) => ({ isPlaying: !state.isPlaying }))
  },

  playPause: () => {
    const { isPlaying } = get();
    const jamStore = useJamStore.getState();
    
    if (jamStore.idJam) {
        const eventType = isPlaying ? "PAUSE_SONG" : "PLAY_SONG";
        jamStore.requestControlEvent(eventType, undefined);
        return;
    }
    
    get().togglePlaying();
  },

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
      const newIndex = state.songs.length;
      
      return {
          songs: newSongs,
          currentSongIndex: newIndex,
          progressSeconds: 0,
          isPlaying: true,
      };
    });
  },
  
  setProgress: (seconds) => set({ progressSeconds: seconds }),
  setVolume: (newVolume) => set({ volume: newVolume }),

  goNextSong: () => set((state) =>{
    const { songs,currentSongIndex} = state;
    if (songs.length === 0) return {};
    const nextIndex = (currentSongIndex + 1) % songs.length;

    return{
      currentSongIndex:nextIndex,
      progressSeconds: 0,
      isPlaying: true,
    };
  }),

  goPrevSong: () => set((state) => {
    const { songs, currentSongIndex } = state;
    if (songs.length === 0) return {};
    
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;

    return {
      currentSongIndex: prevIndex,
      progressSeconds: 0,
      isPlaying: true, 
    };
  }),

  nextSong: () => {
    const jamStore = useJamStore.getState();
    const { songs, currentSongIndex } = get();
    const nextIndex = (currentSongIndex + 1) % songs.length;

    if (jamStore.idJam) {
        const eventType = "PLAY_SONG";
        jamStore.requestControlEvent(eventType, nextIndex);
        return;
    }
    
    get().goNextSong();
  },

  prevSong: () => {
    const jamStore = useJamStore.getState();
    const { songs, currentSongIndex } = get();
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;

    if (jamStore.idJam) {
        const eventType = "PLAY_SONG";
        jamStore.requestControlEvent(eventType, prevIndex);
        return;
    }
    
    get().goPrevSong();
  },

}));