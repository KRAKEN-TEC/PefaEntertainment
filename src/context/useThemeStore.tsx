import { create } from "zustand";

interface themeStore {
  dark: boolean;
  setThemeStore: (theme: boolean) => void;
}

export const useThemeStore = create<themeStore>((set) => ({
  dark: true,
  setThemeStore(dark: boolean) {
    set({ dark: dark });
  },
}));
