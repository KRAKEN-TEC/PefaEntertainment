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
<<<<<<< HEAD
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
    set((state) => ({ actions: state.actions.filter((a) => a !== action) }));
  },
=======
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
>>>>>>> 0c5296706d4f27ba18c66d63a5a0fd00170a4b4a
}));
