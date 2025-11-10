import { create } from "zustand";

export const filters = [
  "Todo",
  "Canciones",
  "Artista",
  "Albumes",
  "Listas",
]

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
