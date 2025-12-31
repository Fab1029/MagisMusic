import { create } from "zustand";
import type { Track } from "@/models/Track";

export interface Playlist {
  id_playlist: number;
  name: string;
  tracks: Track[];
}

interface PlaylistState {
  playlists: Playlist[];
  currentPlaylistId: number | null;

  setPlaylists: (playlists: Playlist[]) => void;
  setCurrentPlaylist: (id: number) => void;
  getCurrentPlaylist: () => Playlist | undefined;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: [],
  currentPlaylistId: null,

  setPlaylists: (playlists) => set({ playlists }),

  setCurrentPlaylist: (id) =>
    set({ currentPlaylistId: id }),

  getCurrentPlaylist: () => {
    const { playlists, currentPlaylistId } = get();
    return playlists.find(p => p.id_playlist === currentPlaylistId);
  },
}));
