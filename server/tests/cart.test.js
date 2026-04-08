const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/prisma", () => ({
  cartItem: {
    findMany: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

const prisma = require("../src/prisma");

const mockItem = { id: 1, userId: 1, productId: 2, quantity: 3, product: { id: 2, name: "Mavic" } };

describe("Cart API", () => {
  afterEach(() => jest.clearAllMocks());

  it("GET /api/cart/:userId – returns cart items", async () => {
    prisma.cartItem.findMany.mockResolvedValue([mockItem]);
    const res = await request(app).get("/api/cart/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockItem]);
  });

  it("POST /api/cart – upserts item", async () => {
    prisma.cartItem.upsert.mockResolvedValue(mockItem);
    const res = await request(app)
      .post("/api/cart")
      .send({ userId: 1, productId: 2, quantity: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockItem);
  });

  it("DELETE /api/cart/user/:userId – clears cart", async () => {
    prisma.cartItem.deleteMany.mockResolvedValue({});
    const res = await request(app).delete("/api/cart/user/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Cart cleared" });
  });

  it("DELETE /api/cart/:id – removes single item", async () => {
    prisma.cartItem.delete.mockResolvedValue({});
    const res = await request(app).delete("/api/cart/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Removed" });
  });
});
