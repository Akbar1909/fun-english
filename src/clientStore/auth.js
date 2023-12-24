import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authType: null,
  setAuthType: (authType) => set((state) => ({ ...state, authType })),
}));
