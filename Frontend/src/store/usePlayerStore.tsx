import type { Track } from "@/models/Track";
import { create } from "zustand";

interface PlayerState {
  currentSong: Track | null; /* ESTO QUITAR */
  isPlaying: boolean;
  progressSeconds: number; 
  volume: number;

  songs: Track[];
  currentSongIndex: number;

  playPause: () => void;
  setSongs: (songs: Track[], index?: number) => void;
  setProgress: (seconds: number) => void;
  setVolume: (newVolume: number) => void;
  nextSong: () => void;
  prevSong: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,/* Este quitale bro :)*/
  isPlaying: false,
  progressSeconds: 0,
  volume: 50,
  songs: [],
  currentSongIndex: 0,
  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  const player = get().;

  setSongs: (newSongs, /*index = 0*/) => {
    
    if (songs.length === 0) return;
    // ELIAN
    /* Obtener indice actual del array lenght*/
    /* PLAY LIST Y ARTISTAS AGREGAR VARIOS*/
    set({ 
      songs: [...songs, newSongs],/* Agregar al array [] push */ 
      currentSongIndex: index, /* lenght */
      currentSong: songs[index], /* YA no es necesario */ 
      progressSeconds: 0, 
      isPlaying: true,
    });
  },
  
  /* ADD SONG */
  /*NUEVO METODO PARA AGREGAR SOLO UNA CANCION*/
  /* Setaer indice a lenght */

  setProgress: (seconds) => set({ progressSeconds: seconds }),
  setVolume: (newVolume) => set({ volume: newVolume }),
  /* REVISAR CON LOS CAMBIOS APLICADOS */
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