// path: src/components/Header.ts
import { Page, Locator } from "@playwright/test";

export class Header {
  constructor(private readonly page: Page) {}

  cartBadge(): Locator {
    return this.page.getByTestId("cart-badge");
  }
}
