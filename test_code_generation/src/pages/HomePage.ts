// path: src/pages/HomePage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  avatar(): Locator {
    return this.page.getByTestId("user-avatar");
  }
}
