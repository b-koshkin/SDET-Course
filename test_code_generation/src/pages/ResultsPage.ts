// path: src/pages/ResultsPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  items(): Locator {
    return this.page.getByTestId("result-item");
  }

  titleOf(index: number): Locator {
    return this.items().nth(index).locator(".title");
  }

  priceOf(index: number): Locator {
    return this.items().nth(index).locator(".price");
  }
}
