import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import path from "path";
import { projects } from "@/content/projects";
import { evidence } from "@/content/evidence";
import { projectCode } from "@/lib/utils";

describe("projectCode", () => {
  it("zero-pads to two digits", () => {
    expect(projectCode(1)).toBe("P01");
    expect(projectCode(10)).toBe("P10");
  });
});

describe("evidence galleries", () => {
  const slugs = new Set(projects.map((p) => p.slug));

  it("only reference existing projects", () => {
    for (const slug of Object.keys(evidence)) expect(slugs.has(slug)).toBe(true);
  });

  it("point at images that exist in /public", () => {
    for (const gallery of Object.values(evidence)) {
      for (const img of gallery.images) {
        expect(existsSync(path.join("public", img.src)), img.src).toBe(true);
      }
    }
  });

  it("every cover image exists in /public", () => {
    for (const p of projects) {
      if (p.coverImage) expect(existsSync(path.join("public", p.coverImage)), p.coverImage).toBe(true);
    }
  });
});
