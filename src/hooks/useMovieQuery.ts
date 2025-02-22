import { create } from "zustand";
import { MovieQuery } from "./useMovie";

interface MovieQueryStore {
    movieQuery: MovieQuery;
    setMovieQuery: (query: MovieQuery) => void;
}

export const useSerieStore = create<MovieQueryStore>((set) => ({
    movieQuery: {} as MovieQuery,
    setMovieQuery: (query) => set({ movieQuery: query }),
}));