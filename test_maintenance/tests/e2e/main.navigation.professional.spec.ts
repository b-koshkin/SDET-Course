/**
 * @suite Main Page Navigation
 * @spec tests/e2e/main.navigation.professional.spec.ts
 *
 * Professionalized from: tests/e2e/main.navigation.refactored.spec.ts (Chapter 3)
 *
 * Changes vs. refactored version:
 *   - Added test case IDs (TC-NAV-001 … TC-NAV-EDGE-001) for traceability
 *   - Eliminated direct `page` fixture access in spec — all interactions via POM
 *   - Improved test titles to behavior-driven format ("should …")
 *   - Added explicit comment where Community deviates from manual test case
 *   - Added edge-case test: unexpected nav item must not appear
 *   - docsPage typed with non-null assertion to satisfy strict TS
 */
import { test } from "@playwright/test";
import { PlaywrightDocsPage } from "../../src/pages/PlaywrightDocsPage";

test.describe("Main page navigation", () => {
  let docsPage!: PlaywrightDocsPage;

  test.beforeEach(async ({ page }) => {
    docsPage = new PlaywrightDocsPage(page);
    await docsPage.goto();
  });

  // TC-NAV-001
  test("TC-NAV-001: Docs nav link should be visible, accessible, and navigate to /docs/intro", async () => {
    await test.step("Docs link is visible in main navigation", async () => {
      await docsPage.expectNavItemVisible("Docs");
    });

    await test.step("Docs link exposes correct accessible name for screen readers", async () => {
      await docsPage.expectNavLinkAccessibleName("Docs");
    });

    await test.step("Clicking Docs navigates to the Installation page (/docs/intro)", async () => {
      await docsPage.clickNavLinkAndExpectUrl("Docs", /\/docs\/intro/);
    });
  });

  // TC-NAV-002
  test("TC-NAV-002: API nav link should be visible, accessible, and navigate to /docs/api", async () => {
    await test.step("API link is visible in main navigation", async () => {
      await docsPage.expectNavItemVisible("API");
    });

    await test.step("API link exposes correct accessible name for screen readers", async () => {
      await docsPage.expectNavLinkAccessibleName("API");
    });

    await test.step("Clicking API navigates to the API reference page (/docs/api)", async () => {
      await docsPage.clickNavLinkAndExpectUrl("API", /\/docs\/api/);
    });
  });

  // TC-NAV-003
  // Known discrepancy: on playwright.dev "Community" is a footer section heading,
  // not a navigation link. Test verifies page-level presence per manual TC expectation.
  test("TC-NAV-003: Community section should be present on the page", async () => {
    await test.step("Community text is visible somewhere on the page", async () => {
      await docsPage.expectPageSectionVisible("Community");
    });
  });

  // TC-NAV-EDGE-001: Edge case — navigation must not silently grow with unintended links
  test("TC-NAV-EDGE-001: Navigation should not contain unexpected items (e.g. Settings)", async () => {
    await test.step("Settings link is absent from main navigation", async () => {
      await docsPage.expectNavLinkAbsent("Settings");
    });
  });
});
