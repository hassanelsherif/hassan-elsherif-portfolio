import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validation";

describe("contactSchema", () => {
  const valid = {
    name: "Hassan El-Sherif",
    email: "hassan@example.com",
    subject: "Job opportunity",
    message: "Hello, I have a Cloud Engineer role I'd like to discuss.",
    honeypot: "",
  };

  it("accepts a valid submission", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...valid, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...valid, subject: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...valid, message: "Short" });
    expect(result.success).toBe(false);
  });

  it("rejects a message longer than 3000 characters", () => {
    const result = contactSchema.safeParse({ ...valid, message: "x".repeat(3001) });
    expect(result.success).toBe(false);
  });

  it("rejects when honeypot is filled", () => {
    const result = contactSchema.safeParse({ ...valid, honeypot: "I am a bot" });
    expect(result.success).toBe(false);
  });
});
