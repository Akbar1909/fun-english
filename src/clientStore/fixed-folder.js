import { create } from "zustand";

export const useFixedFolderStore = create((set) => ({
  savedWordIds: [],
  savedWordElements: [],
  count: 0,
  push: ({ wordElement, wordId }) =>
    set((state) => ({
      ...state,
      savedWordElements: [...state.savedWordElements, wordElement],
      savedWordIds: [...state.savedWordIds, wordId],
    })),

  incrementCount: () => set((state) => ({ ...state, count: state.count + 1 })),
}));
