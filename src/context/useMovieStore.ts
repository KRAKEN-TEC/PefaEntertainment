import { create } from 'zustand';
import { MovieQuery } from '@/hooks/useMovie';

export interface ActionSlice {
    movieQuery: MovieQuery;
    actions: string[];
    setMovieQuery: (query: MovieQuery) => void;
    updateActions: (actions: string[]) => void;
    addAction: (action: string) => void;
    removeAction: (action: string) => void;
}

export const useMovieStore = create<ActionSlice>((set) => ({
    actions: [],
    movieQuery: {} as MovieQuery,
    setMovieQuery: (query) => set({ movieQuery: query }),
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