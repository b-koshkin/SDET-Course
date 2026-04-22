/**
 * @deprecated Chapter 2 intentional degradation — kept for historical reference only.
 * Superseded by: tests/e2e/main.navigation.professional.spec.ts
 * Issues: brittle #docs selector, waitForTimeout(2000). Do NOT run in CI.
 */
import { test, expect } from "@playwright/test";
import { PlaywrightDocsPage } from "../../src/pages/PlaywrightDocsPage";

test.describe
  .skip("Main page navigation [RETIRED — Ch.2 degraded, use main.navigation.professional.spec.ts]", () => {
  test("main page displays navigation buttons: Docs, API, Community", async ({
    page,
  }) => {
    const docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();

    // Degradation 1: brittle CSS/ID selector instead of role+name locator
    const docsLink = page.locator("#docs");
    await expect(docsLink).toBeVisible();

    // Degradation 2: fixed wait instead of state-based assertion
    await page.waitForTimeout(2000);

    await docsPage.expectNavLinksVisible(["API", "Community"]);
  });
});
