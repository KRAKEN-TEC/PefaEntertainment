import { create } from "zustand";
import { FetchMovies, MovieQuery } from "@/hooks/useMovie";

export interface ActionSlice {
  movieQuery: MovieQuery;
  actions: string[];
  moviesStore: FetchMovies[];
  setMovieQuery: (query: MovieQuery) => void;
  setMovieStore: (movies: FetchMovies[]) => void;
  updateActions: (actions: string[]) => void;
  addAction: (action: string) => void;
  removeAction: (action: string) => void;
}

export const useMovieStore = create<ActionSlice>((set) => ({
  actions: [],
  movieQuery: { page: 0 } as MovieQuery,
  moviesStore: [] as FetchMovies[],
  setMovieStore: (movies: FetchMovies[]) => {
    set({ moviesStore: movies });
  },
  setMovieQuery: (query) => set({ movieQuery: query }),
  updateActions: (actions) => {
    set({ actions: actions });
  },
  addAction: (action) => {
    set((state) => ({ actions: [...state.actions, action] }));
  },
  removeAction: (action) => {
    set((state) => ({ actions: state.actions.filter((a) => a !== action) }));
  },
}));
