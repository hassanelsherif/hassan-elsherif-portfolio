import { describe, it, expect } from "vitest";
import { projects, projectResults } from "@/content/projects";

describe("project results", () => {
  it("only reference existing projects", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const slug of Object.keys(projectResults)) expect(slugs.has(slug)).toBe(true);
  });

  it("each project has a results strip with 3 items and a source note", () => {
    for (const p of projects) {
      const r = projectResults[p.slug];
      expect(r, p.slug).toBeDefined();
      expect(r.items).toHaveLength(3);
      expect(r.source.length).toBeGreaterThan(0);
    }
  });
});
