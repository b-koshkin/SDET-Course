// path: src/pages/CheckoutPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  total(): Locator {
    return this.page.getByTestId("cart-total");
  }

  placeOrder(): Locator {
    return this.page.getByTestId("place-order");
  }
}
