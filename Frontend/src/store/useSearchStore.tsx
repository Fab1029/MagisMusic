import { create } from "zustand";

export const filters = [
  "Todo",
  "Artista",
  "Albumes",
  "Canciones",
  "Listas"
]

interface SearchState {
  query: string;
  filter: string;
  setQuery: (query: string) => void;
  setFilter: (filter: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  filter: filters[0],
  setQuery: (query) => set({ query }),
  setFilter: (filter) => set({ filter }),
}));
