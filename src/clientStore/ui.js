import { create } from "zustand";

export const useUIStore = create((set) => ({
  authModalOpen: false,
  toggleAuthModal: () =>
    set((state) => ({ ...state, authModalOpen: !state.authModalOpen })),
}));
