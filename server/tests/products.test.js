const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/prisma", () => ({
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const prisma = require("../src/prisma");

const mockProduct = { id: 1, name: "Phantom 4", price: 999, category: "pro", purpose: "photography", experience: "advanced" };

describe("Products API", () => {
  afterEach(() => jest.clearAllMocks());

  it("GET /api/products – returns all products", async () => {
    prisma.product.findMany.mockResolvedValue([mockProduct]);
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockProduct]);
  });

  it("GET /api/products?category=pro – passes filter to prisma", async () => {
    prisma.product.findMany.mockResolvedValue([mockProduct]);
    await request(app).get("/api/products?category=pro");
    expect(prisma.product.findMany).toHaveBeenCalledWith({ where: { category: "pro" } });
  });

  it("GET /api/products/:id – returns single product", async () => {
    prisma.product.findUnique.mockResolvedValue(mockProduct);
    const res = await request(app).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
  });

  it("GET /api/products/:id – 404 when not found", async () => {
    prisma.product.findUnique.mockResolvedValue(null);
    const res = await request(app).get("/api/products/99");
    expect(res.status).toBe(404);
  });

  it("POST /api/products – creates and returns product", async () => {
    prisma.product.create.mockResolvedValue(mockProduct);
    const res = await request(app).post("/api/products").send(mockProduct);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockProduct);
  });

  it("PUT /api/products/:id – updates product", async () => {
    const updated = { ...mockProduct, price: 1200 };
    prisma.product.update.mockResolvedValue(updated);
    const res = await request(app).put("/api/products/1").send({ price: 1200 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(1200);
  });

  it("PUT /api/products/:id – 404 when not found", async () => {
    prisma.product.update.mockRejectedValue(new Error("Not found"));
    const res = await request(app).put("/api/products/99").send({ price: 1 });
    expect(res.status).toBe(404);
  });

  it("DELETE /api/products/:id – deletes product", async () => {
    prisma.product.delete.mockResolvedValue({});
    const res = await request(app).delete("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  it("DELETE /api/products/:id – 404 when not found", async () => {
    prisma.product.delete.mockRejectedValue(new Error("Not found"));
    const res = await request(app).delete("/api/products/99");
    expect(res.status).toBe(404);
  });
});
