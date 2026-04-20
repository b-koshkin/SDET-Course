// path: src/pages/SearchPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate("/search");
    await this.waitForPageLoad();
  }

  queryInput(): Locator {
    return this.page.getByTestId("search-input");
  }

  submit(): Locator {
    return this.page.getByTestId("search-submit");
  }

  productResult(name: string): Locator {
    return this.page.getByTestId("product-result").filter({ hasText: name });
  }

  applyFilter(filterName: string): Locator {
    return this.page
      .getByTestId("filter-option")
      .filter({ hasText: filterName });
  }
}
