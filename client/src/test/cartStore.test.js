import { describe, it, expect, beforeEach, vi } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ id: 10 }) })
);

beforeEach(async () => {
  vi.resetModules();
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ id: 10 }) })
  );
});

async function freshStore() {
  const { useCartStore } = await import("../store/cartStore");
  useCartStore.setState({ items: [] });
  return useCartStore;
}

const drone = { id: 1, name: "Mavic", price: 500 };

describe("cartStore", () => {
  it("addItem – adds new item with quantity 1", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone);
    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0].quantity).toBe(1);
  });

  it("addItem – increments quantity for existing item", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone, 1);
    await store.getState().addItem(drone, 2);
    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0].quantity).toBe(3);
  });

  it("removeItem – removes item by id", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone);
    store.getState().removeItem(drone.id);
    expect(store.getState().items).toHaveLength(0);
  });

  it("updateQuantity – updates item quantity", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone);
    await store.getState().updateQuantity(drone.id, 5);
    expect(store.getState().items[0].quantity).toBe(5);
  });

  it("updateQuantity – removes item when quantity <= 0", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone);
    await store.getState().updateQuantity(drone.id, 0);
    expect(store.getState().items).toHaveLength(0);
  });

  it("clearCart – empties all items", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone);
    await store.getState().clearCart();
    expect(store.getState().items).toHaveLength(0);
  });

  it("getTotal – calculates correct total", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone, 3);
    expect(store.getState().getTotal()).toBe(1500);
  });

  it("getCount – returns total item count", async () => {
    const store = await freshStore();
    await store.getState().addItem(drone, 4);
    expect(store.getState().getCount()).toBe(4);
  });
});
