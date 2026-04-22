/**
 * @suite Playwright Docs — Core Smoke
 * Covers foundational checks: page title and primary CTA navigation.
 * Reference: main.navigation.professional.spec.ts for navigation deep-checks.
 */
import { test } from "@playwright/test";
import { PlaywrightDocsPage } from "../../src/pages/PlaywrightDocsPage";

test.describe("Playwright documentation — core smoke", () => {
  let docsPage!: PlaywrightDocsPage;

  test.beforeEach(async ({ page }) => {
    docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();
  });

  // TC-DOCS-001
  test("TC-DOCS-001: Page title should contain 'Playwright'", async () => {
    await test.step("Title contains 'Playwright'", async () => {
      await docsPage.expectTitleContains("Playwright");
    });
  });

  // TC-DOCS-002
  test("TC-DOCS-002: 'Get started' link should navigate to the Installation page", async () => {
    await test.step("Click Get started link", async () => {
      await docsPage.clickGetStarted();
    });

    await test.step("Installation heading is visible", async () => {
      await docsPage.expectInstallationHeadingVisible();
    });
  });
});
