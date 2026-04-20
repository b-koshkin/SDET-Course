// path: src/pages/ProductPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  addToCart(): Locator {
    return this.page.getByTestId("add-to-cart");
  }

  title(): Locator {
    return this.page.getByTestId("product-title");
  }

  price(): Locator {
    return this.page.getByTestId("product-price");
  }
}
