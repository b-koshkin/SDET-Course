// path: tests/e2e/search.spec.ts
import { test, expect } from "@playwright/test";
import { SearchPage } from "../../src/pages/SearchPage";
import { ResultsPage } from "../../src/pages/ResultsPage";

test.describe("Search", () => {
  test("filter results by price under $1000", async ({ page }) => {
    const searchPage = new SearchPage(page);
    const resultsPage = new ResultsPage(page);

    // Initialization: open search page
    await searchPage.open();

    // User actions: type "Laptop", apply filter "Price < $1000"
    await searchPage.queryInput().fill("Laptop");
    await searchPage.submit().click();
    await searchPage.applyFilter("Price < $1000").click();

    // Verification: each result price < 1000
    const count = await resultsPage.items().count();
    for (let i = 0; i < count; i++) {
      const priceText = await resultsPage.priceOf(i).innerText();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      expect(price).toBeLessThan(1000);
    }
  });
});
