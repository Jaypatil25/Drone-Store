import { create } from 'zustand';

const API = import.meta.env.VITE_API_URL || '/api';

export const useOrderStore = create((set, get) => ({
  orders: [],

  fetchOrders: async (userId) => {
    try {
      const res = await fetch(`${API}/orders/${userId}`);
      const data = await res.json();
      set({ orders: data });
    } catch { /* keep local */ }
  },

  addOrder: async (order, userId = null) => {
    const localOrder = {
      ...order,
      id: 'DRX-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    set({ orders: [localOrder, ...get().orders] });

    if (userId) {
      try {
        const res = await fetch(`${API}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            totalAmount: order.total,
            address: JSON.stringify(order.shipping || {}),
            items: (order.items || []).map(i => ({
              productId: i.id,
              quantity: i.quantity,
              price: i.price,
            })),
          }),
        });
        const data = await res.json();
        set({ orders: [data, ...get().orders.filter(o => o.id !== localOrder.id)] });
      } catch { /* keep optimistic */ }
    }
  },
}));
