import { create } from "zustand";
import { SerieQuery } from "@/hooks/useSerie";

interface SerieQueryStore {
    serieQuery: SerieQuery;
    setSerieQuery: (query: SerieQuery) => void;
}

export const useSerieStore = create<SerieQueryStore>((set) => ({
    serieQuery: {} as SerieQuery,
    setSerieQuery: (query) => set({ serieQuery: query }),
}));