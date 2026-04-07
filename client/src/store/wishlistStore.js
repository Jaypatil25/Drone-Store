import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (drone) => {
        if (!get().items.find(i => i.id === drone.id)) {
          set({ items: [...get().items, drone] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      isInWishlist: (id) => get().items.some(i => i.id === id),
      getCount: () => get().items.length,
    }),
    { name: 'dronix-wishlist' }
  )
);
