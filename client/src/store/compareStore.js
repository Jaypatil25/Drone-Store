import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (drone) => {
        const items = get().items;
        if (items.length >= 3) return false;
        if (items.find(i => i.id === drone.id)) return false;
        set({ items: [...items, drone] });
        return true;
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      isInCompare: (id) => get().items.some(i => i.id === id),
      clearAll: () => set({ items: [] }),
    }),
    { name: 'dronix-compare' }
  )
);
