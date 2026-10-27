import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage renders key content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Hassan El-Sherif/i })).toBeVisible();
    await expect(page.getByText(/Cloud \/ DevOps Engineer/i)).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Projects/i }).first().click();
    await expect(page).toHaveURL(/\/projects/);
  });

  test("projects page shows 5 projects", async ({ page }) => {
    await page.goto("/projects");
    const cards = page.locator("article");
    await expect(cards).toHaveCount(5);
  });

  test("contact page renders form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("textbox", { name: /name/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /subject/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /message/i })).toBeVisible();
  });

  test("404 page renders with navigation links", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByRole("link", { name: /Home/i })).toBeVisible();
  });

  test("CV download link exists on homepage", async ({ page }) => {
    await page.goto("/");
    const cvLink = page.getByRole("link", { name: /Download CV/i }).first();
    await expect(cvLink).toBeVisible();
  });
});
