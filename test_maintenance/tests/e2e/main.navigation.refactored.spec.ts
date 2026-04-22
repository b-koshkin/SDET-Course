/**
 * @deprecated Chapter 3 intermediate refactor — kept for reference only.
 * Superseded by: tests/e2e/main.navigation.professional.spec.ts
 *
 * Refactored from: tests/e2e/main.navigation.spec.ts (Chapter 2 degraded version)
 * Fixes applied:
 *   - Replaced #docs CSS selector with role+name locator scoped to navigation
 *   - Removed waitForTimeout(2000); rely on Playwright auto-wait
 *   - Added navigation target assertions (URL checks after click)
 *   - Added accessibility assertions (toHaveAccessibleName)
 *   - Used test.step for granular failure reporting
 *   - "Community" correctly asserted as page-level text (not a nav link on playwright.dev)
 */
import { test, expect } from "@playwright/test";
import { PlaywrightDocsPage } from "../../src/pages/PlaywrightDocsPage";

test.describe
  .skip("Main page navigation [RETIRED — Ch.3 refactor, use main.navigation.professional.spec.ts]", () => {
  let docsPage: PlaywrightDocsPage;

  test.beforeEach(async ({ page }) => {
    docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();
  });

  test("Docs nav link is visible and accessible", async () => {
    await test.step("Docs link is visible in navigation", async () => {
      await docsPage.expectNavItemVisible("Docs");
    });

    await test.step("Docs link has correct accessible name", async () => {
      await docsPage.expectNavLinkAccessibleName("Docs");
    });

    await test.step("Docs link navigates to installation page", async () => {
      await docsPage.clickNavLinkAndExpectUrl("Docs", /\/docs\/intro/);
    });
  });

  test("API nav link is visible and accessible", async () => {
    await test.step("API link is visible in navigation", async () => {
      await docsPage.expectNavItemVisible("API");
    });

    await test.step("API link has correct accessible name", async () => {
      await docsPage.expectNavLinkAccessibleName("API");
    });

    await test.step("API link navigates to API reference page", async () => {
      await docsPage.clickNavLinkAndExpectUrl("API", /\/docs\/api/);
    });
  });

  test("Community section is present on the page", async ({ page }) => {
    // NOTE: "Community" is a footer section on playwright.dev, not a nav link.
    // Manual test case expectation adjusted to reflect actual site structure.
    await test.step("Community text is visible on page", async () => {
      await expect(
        page.getByText("Community", { exact: true }).first(),
      ).toBeVisible();
    });
  });
});
