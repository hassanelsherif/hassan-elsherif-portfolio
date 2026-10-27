import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "./index.js";

describe("P02 Demo App", () => {
  describe("GET /health", () => {
    it("returns status ok", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("GET /", () => {
    it("returns app info", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("P02");
    });
  });

  describe("POST /calculate", () => {
    it("adds two numbers", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: 5, b: 3, operation: "add" });
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(8);
    });

    it("subtracts two numbers", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: 10, b: 4, operation: "subtract" });
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(6);
    });

    it("multiplies two numbers", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: 3, b: 7, operation: "multiply" });
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(21);
    });

    it("divides two numbers", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: 15, b: 3, operation: "divide" });
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(5);
    });

    it("rejects division by zero", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: 5, b: 0, operation: "divide" });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Division by zero");
    });

    it("rejects invalid operation", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: 5, b: 3, operation: "power" });
      expect(res.status).toBe(400);
    });

    it("rejects non-numeric inputs", async () => {
      const res = await request(app)
        .post("/calculate")
        .send({ a: "five", b: 3, operation: "add" });
      expect(res.status).toBe(400);
    });
  });
});
