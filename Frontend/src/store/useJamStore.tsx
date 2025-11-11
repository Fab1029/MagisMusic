import { create } from "zustand";

interface JamState {
  idJam: string;
  setIdJam: (id: string) => void;
}

export const useJamStore = create<JamState>((set) => ({
  idJam: '',
  setIdJam: (idJam) => set({ idJam: idJam }),
}));
