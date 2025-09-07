import { create } from "zustand";

type UIState = { drawerOpen: boolean; toggleDrawer: () => void };
export const useUIStore = create<UIState>((set, get) => ({
  drawerOpen: true,
  toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),
}));
