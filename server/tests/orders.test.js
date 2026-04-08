const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/prisma", () => ({
  order: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

const prisma = require("../src/prisma");

const mockOrder = {
  id: 1,
  userId: 1,
  totalAmount: 999,
  address: "123 Main St",
  status: "PENDING",
  items: [{ productId: 2, quantity: 1, price: 999 }],
};

describe("Orders API", () => {
  afterEach(() => jest.clearAllMocks());

  it("GET /api/orders/:userId – returns orders", async () => {
    prisma.order.findMany.mockResolvedValue([mockOrder]);
    const res = await request(app).get("/api/orders/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockOrder]);
  });

  it("POST /api/orders – creates order", async () => {
    prisma.order.create.mockResolvedValue(mockOrder);
    const res = await request(app).post("/api/orders").send({
      userId: 1,
      totalAmount: 999,
      address: "123 Main St",
      items: [{ productId: 2, quantity: 1, price: 999 }],
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockOrder);
  });

  it("POST /api/orders – 400 on invalid data", async () => {
    prisma.order.create.mockRejectedValue(new Error("Invalid"));
    const res = await request(app).post("/api/orders").send({});
    expect(res.status).toBe(400);
  });

  it("PATCH /api/orders/:id/status – updates status", async () => {
    prisma.order.update.mockResolvedValue({ ...mockOrder, status: "SHIPPED" });
    const res = await request(app)
      .patch("/api/orders/1/status")
      .send({ status: "SHIPPED" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("SHIPPED");
  });
});
