import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug, getAllProjectSlugs } from "@/content/projects";

describe("projects content", () => {
  it("has exactly 5 projects", () => {
    expect(projects).toHaveLength(5);
  });

  it("each project has a unique slug", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("each project has a non-empty title and problem", () => {
    for (const p of projects) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.problem.length).toBeGreaterThan(0);
    }
  });

  it("getProjectBySlug returns correct project", () => {
    const p = getProjectBySlug("aws-infrastructure-as-code");
    expect(p).toBeDefined();
    expect(p?.title).toBe("AWS Infrastructure as Code");
  });

  it("getProjectBySlug returns undefined for unknown slug", () => {
    expect(getProjectBySlug("nonexistent")).toBeUndefined();
  });

  it("getAllProjectSlugs returns 5 slugs", () => {
    expect(getAllProjectSlugs()).toHaveLength(5);
  });
});
