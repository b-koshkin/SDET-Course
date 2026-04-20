// path: src/pages/CartPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  items(): Locator {
    return this.page.getByTestId("cart-item");
  }

  proceedToCheckout(): Locator {
    return this.page.getByTestId("checkout-btn");
  }
}
