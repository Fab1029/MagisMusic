import { openDB } from 'idb';
import type { Track } from '@/models/Track';

const DB_NAME = 'magis-music-offline';
const STORE_NAME = 'downloaded-tracks';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveTrackOffline = async (track: Track) => {
  const db = await initDB();
  await db.put(STORE_NAME, track);
};

export const getOfflineTracks = async (): Promise<Track[]> => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const removeTrackOffline = async (id: number) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};