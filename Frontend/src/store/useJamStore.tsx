import { create } from "zustand";

interface JamState {
  id: string;
  setId: (id: string) => void;
}

export const useJamStore = create<JamState>((set) => ({
  id: "",
  setId: (id) => set({ id }),
}));
