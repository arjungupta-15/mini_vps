const request = require("supertest");
const app = require("./index");

// ─── Health Check Tests ────────────────────────────────────
describe("GET /health", () => {
  test("should return 200 with status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});

// ─── Home Route Tests ──────────────────────────────────────
describe("GET /", () => {
  test("should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Welcome to Mini API!");
  });
});

// ─── Users Tests ───────────────────────────────────────────
describe("GET /api/users", () => {
  test("should return list of users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe("POST /api/users", () => {
  test("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Dave", role: "Tester" });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Dave");
  });

  test("should return 400 if name is missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ role: "Tester" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return 400 if role is missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Dave" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
