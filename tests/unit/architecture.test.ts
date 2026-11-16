import { describe, it, expect } from "vitest";
import { projects } from "@/content/projects";
import { architectureDiagrams } from "@/content/architecture";
import { nodeHeight } from "@/components/case-study/ArchitectureDiagram";

describe("architecture diagrams", () => {
  it("exist for every project", () => {
    for (const p of projects) expect(architectureDiagrams[p.slug], p.slug).toBeDefined();
  });

  it("keep every node, group and edge inside the viewBox", () => {
    for (const [slug, d] of Object.entries(architectureDiagrams)) {
      for (const n of d.nodes) {
        expect(n.x + n.w, `${slug}/${n.id} right edge`).toBeLessThanOrEqual(d.width);
        expect(n.y + nodeHeight(n.lines?.length), `${slug}/${n.id} bottom edge`).toBeLessThanOrEqual(d.height);
      }
      for (const g of d.groups ?? []) {
        expect(g.x + g.w, `${slug}/${g.label}`).toBeLessThanOrEqual(d.width);
        expect(g.y + g.h, `${slug}/${g.label}`).toBeLessThanOrEqual(d.height);
      }
      for (const e of d.edges ?? [])
        for (const [x, y] of e.points) {
          expect(x).toBeLessThanOrEqual(d.width);
          expect(y).toBeLessThanOrEqual(d.height);
        }
    }
  });

  it("have unique node ids and a screen-reader summary", () => {
    for (const d of Object.values(architectureDiagrams)) {
      const ids = d.nodes.map((n) => n.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(d.summary.length).toBeGreaterThan(50);
    }
  });
});
