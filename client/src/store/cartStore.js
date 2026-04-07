import { create } from 'zustand';

const API = import.meta.env.VITE_API_URL || '/api';

export const useCartStore = create((set, get) => ({
  items: [],

  // Load cart from server for logged-in user
  fetchCart: async (userId) => {
    try {
      const res = await fetch(`${API}/cart/${userId}`);
      const data = await res.json();
      // Normalize server items to match local shape
      const items = data.map(i => ({
        ...i.product,
        cartItemId: i.id,
        quantity: i.quantity,
      }));
      set({ items });
    } catch { /* keep local state */ }
  },

  addItem: async (drone, quantity = 1, userId = null) => {
    const items = get().items;
    const existing = items.find(i => i.id === drone.id);
    const newQty = existing ? existing.quantity + quantity : quantity;

    // Optimistic update
    if (existing) {
      set({ items: items.map(i => i.id === drone.id ? { ...i, quantity: newQty } : i) });
    } else {
      set({ items: [...items, { ...drone, quantity }] });
    }

    if (userId) {
      try {
        const res = await fetch(`${API}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId: drone.id, quantity: newQty }),
        });
        const data = await res.json();
        // Update cartItemId for future deletes
        set({ items: get().items.map(i => i.id === drone.id ? { ...i, cartItemId: data.id } : i) });
      } catch { /* keep optimistic */ }
    }
  },

  removeItem: async (id, userId = null) => {
    const item = get().items.find(i => i.id === id);
    set({ items: get().items.filter(i => i.id !== id) });

    if (userId && item?.cartItemId) {
      try {
        await fetch(`${API}/cart/${item.cartItemId}`, { method: 'DELETE' });
      } catch { /* keep optimistic */ }
    }
  },

  updateQuantity: async (id, quantity, userId = null) => {
    if (quantity <= 0) {
      get().removeItem(id, userId);
      return;
    }
    set({ items: get().items.map(i => i.id === id ? { ...i, quantity } : i) });

    if (userId) {
      const item = get().items.find(i => i.id === id);
      try {
        await fetch(`${API}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId: id, quantity }),
        });
      } catch { /* keep optimistic */ }
    }
  },

  clearCart: async (userId = null) => {
    set({ items: [] });
    if (userId) {
      try {
        await fetch(`${API}/cart/user/${userId}`, { method: 'DELETE' });
      } catch { /* keep optimistic */ }
    }
  },

  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
