import { describe, it, expect, beforeEach, vi } from "vitest";

// Make persist a no-op so tests don't need localStorage
vi.mock("zustand/middleware", async (importOriginal) => {
  const actual = await importOriginal<typeof import("zustand/middleware")>();
  return { ...actual, persist: (fn: unknown) => fn };
});

import { useWishlistStore } from "../store/wishlistStore";

const drone = { id: 1, name: "Phantom", price: 800 };
const drone2 = { id: 2, name: "Mavic", price: 500 };

beforeEach(() => {
  useWishlistStore.setState({ items: [] });
});

describe("wishlistStore", () => {
  it("addItem – adds a drone", () => {
    useWishlistStore.getState().addItem(drone);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it("addItem – does not add duplicate", () => {
    useWishlistStore.getState().addItem(drone);
    useWishlistStore.getState().addItem(drone);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it("removeItem – removes by id", () => {
    useWishlistStore.getState().addItem(drone);
    useWishlistStore.getState().removeItem(drone.id);
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("isInWishlist – returns true when present", () => {
    useWishlistStore.getState().addItem(drone);
    expect(useWishlistStore.getState().isInWishlist(drone.id)).toBe(true);
  });

  it("isInWishlist – returns false when absent", () => {
    expect(useWishlistStore.getState().isInWishlist(99)).toBe(false);
  });

  it("getCount – returns correct count", () => {
    useWishlistStore.getState().addItem(drone);
    useWishlistStore.getState().addItem(drone2);
    expect(useWishlistStore.getState().getCount()).toBe(2);
  });
});
