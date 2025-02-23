import { create } from "zustand";
import { SerieQuery } from "@/hooks/useSerie";

interface SerieQueryStore {
    actions: string[];
    serieQuery: SerieQuery;
    setSerieQuery: (query: SerieQuery) => void;
    updateActions: (actions: string[]) => void;
    addAction: (action: string) => void;
    removeAction: (action: string) => void;
}

export const useSerieStore = create<SerieQueryStore>((set) => ({
    actions: [],
    serieQuery: {} as SerieQuery,
    setSerieQuery: (query) => set({ serieQuery: query }),
    updateActions: (actions) => {
        set({ actions: actions });
    },
    addAction: (action) => {
        set((state) => ({ actions: [...state.actions, action] }));
    },
    removeAction: (action) => {
        set((state) => ({ actions: state.actions.filter(a => a !== action) }));
    }
}));
