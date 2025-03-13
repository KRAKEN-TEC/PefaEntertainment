import { create } from "zustand";
import { FetchSeries, SerieQuery } from "@/hooks/useSerie";

interface SerieQueryStore {
    actions: string[];
    serieQuery: SerieQuery;
    seriesStore: FetchSeries[];
    setSeriesStore: (series: FetchSeries[]) => void;
    setSerieQuery: (query: SerieQuery) => void;
    updateActions: (actions: string[]) => void;
    addAction: (action: string) => void;
    removeAction: (action: string) => void;
}

export const useSerieStore = create<SerieQueryStore>((set) => ({
    actions: [],
    serieQuery: { page: 0 } as SerieQuery,
    seriesStore: [] as FetchSeries[],
    setSeriesStore(series: FetchSeries[]) {
        set({ seriesStore: series });
    },
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
