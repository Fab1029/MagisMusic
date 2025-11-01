import { create } from "zustand";

export const filters = [
  "Todo",
  "Artista",
  "Álbumes",
  "Canciones",
  "Listas"
]

interface SearchState {
  queryParams: string;
  filter: string;
  setQueryParams: (query: string) => void;
  setFilter: (filter: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  queryParams: "",
  filter: filters[0],
  setQueryParams: (queryParams) => set({ queryParams }),
  setFilter: (filter) => set({ filter }),
}));
