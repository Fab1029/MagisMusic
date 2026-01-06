import { openDB } from 'idb';
import type { Track } from '@/models/Track';
import type { Playlist } from '@/store/usePlaylistStore';

const DB_NAME = 'magis-music-offline';
const TRACKS_STORE = 'downloaded-tracks';
const PLAYLISTS_STORE = 'downloaded-playlists';

export const initDB = async () => {
  return openDB(DB_NAME, 2, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore(TRACKS_STORE, { keyPath: 'id' });
      }
      if (oldVersion < 2) {
        if (!db.objectStoreNames.contains(PLAYLISTS_STORE)) {
          db.createObjectStore(PLAYLISTS_STORE, { keyPath: 'id' });
        }
      }
    },
  });
};

export const saveTrackOffline = async (track: Track, isIndividual: boolean = true) => {
  const db = await initDB();
  await db.put(TRACKS_STORE, { ...track, isIndividual });
};

export const getOfflineTracks = async (): Promise<Track[]> => {
  const db = await initDB();
  return await db.getAll(TRACKS_STORE);
};

export const getOfflineIndividualTracks = async (): Promise<Track[]> => {
  const db = await initDB();
  const allTracks = await db.getAll(TRACKS_STORE);
  return allTracks.filter((track: any) => track.isIndividual === true);
};

export const savePlaylistOffline = async (playlist: Playlist) => {
  const db = await initDB();
  await db.put(PLAYLISTS_STORE, playlist);
};

export const getOfflinePlaylists = async (): Promise<Playlist[]> => {
  const db = await initDB();
  return await db.getAll(PLAYLISTS_STORE);
};

export const getOfflinePlaylistById = async (id: number) => {
  const db = await initDB();
  return await db.get(PLAYLISTS_STORE, id);
};

export const removePlaylistOffline = async (id: number) => {
  const db = await initDB();
  await db.delete(PLAYLISTS_STORE, id);
};