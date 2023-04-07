import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  totalItems: 0,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
  setTotalItems: (totalItems) => set({ totalItems }),
}));
