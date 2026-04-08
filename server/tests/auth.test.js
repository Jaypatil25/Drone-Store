const request = require("supertest");
const app = require("../src/app");
const crypto = require("crypto");

jest.mock("../src/prisma", () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

jest.mock("firebase-admin", () => ({
  apps: [],
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
  auth: () => ({ verifyIdToken: jest.fn() }),
}));

const prisma = require("../src/prisma");
const hash = (pw) => crypto.createHash("sha256").update(pw).digest("hex");

const mockUser = { id: 1, name: "Jay", email: "jay@test.com", role: "USER" };

describe("Auth API", () => {
  afterEach(() => jest.clearAllMocks());

  it("POST /api/auth/register – creates user", async () => {
    prisma.user.create.mockResolvedValue(mockUser);
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Jay", email: "jay@test.com", password: "secret" });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe("jay@test.com");
  });

  it("POST /api/auth/register – 400 on duplicate email", async () => {
    prisma.user.create.mockRejectedValue(new Error("Unique constraint"));
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Jay", email: "jay@test.com", password: "secret" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already in use");
  });

  it("POST /api/auth/login – returns user on valid credentials", async () => {
    prisma.user.findUnique.mockResolvedValue({ ...mockUser, password: hash("secret") });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "jay@test.com", password: "secret" });
    expect(res.status).toBe(200);
    expect(res.body.email).toBe("jay@test.com");
  });

  it("POST /api/auth/login – 401 on wrong password", async () => {
    prisma.user.findUnique.mockResolvedValue({ ...mockUser, password: hash("secret") });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "jay@test.com", password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("POST /api/auth/login – 401 when user not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@test.com", password: "x" });
    expect(res.status).toBe(401);
  });

  it("POST /api/auth/login – 401 for Google-only account (no password)", async () => {
    prisma.user.findUnique.mockResolvedValue({ ...mockUser, password: null });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "jay@test.com", password: "secret" });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Please sign in with Google");
  });
});
