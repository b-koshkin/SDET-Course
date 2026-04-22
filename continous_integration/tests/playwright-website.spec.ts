import { test, expect } from "@playwright/test";

test.describe("Playwright.dev - Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title correct", async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("hero heading visible", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: /Playwright enables reliable web automation/i,
    });
    await expect(heading).toBeVisible();
  });

  test("Get Started link navigates to intro", async ({ page }) => {
    await page.getByRole("link", { name: "Get started" }).first().click();
    await expect(page).toHaveURL(/intro/);
  });
});

test.describe("Playwright.dev - Docs Navigation", () => {
  test("Writing tests page loads", async ({ page }) => {
    await page.goto("/docs/writing-tests");
    await expect(
      page.getByRole("heading", { name: "Writing tests" }),
    ).toBeVisible();
  });

  test("API docs page loads", async ({ page }) => {
    await page.goto("/docs/api/class-playwright");
    await expect(
      page.getByRole("heading", { name: "Playwright" }).first(),
    ).toBeVisible();
  });

  test("sidebar has Guides section", async ({ page }) => {
    await page.goto("/docs/intro");
    await expect(page.getByText("Guides").first()).toBeVisible();
  });
});

test.describe("Playwright.dev - Community", () => {
  test("Discord community link visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "Discord" }).first(),
    ).toBeVisible();
  });

  test("Community page loads", async ({ page }) => {
    await page.goto("/community/welcome");
    await expect(page).toHaveURL(/community/);
  });
});
