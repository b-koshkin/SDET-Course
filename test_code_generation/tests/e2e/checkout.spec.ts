// path: tests/e2e/checkout.spec.ts
import { test, expect } from "@playwright/test";
import { SearchPage } from "../../src/pages/SearchPage";
import { ProductPage } from "../../src/pages/ProductPage";
import { CartPage } from "../../src/pages/CartPage";
import { CheckoutPage } from "../../src/pages/CheckoutPage";
import { Header } from "../../src/components/Header";
import { searchProduct, expectedTotal } from "../../src/fixtures/testData";

test.describe("Checkout flow", () => {
  test("search, add to cart, and checkout", async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const header = new Header(page);

    // Initialization: open search page
    await searchPage.open();

    // User actions: search, select product, add to cart
    await searchPage.queryInput().fill(searchProduct.query);
    await searchPage.submit().click();
    await searchPage.productResult(searchProduct.name).click();
    await productPage.addToCart().click();

    // Verification: cart badge increments
    await expect(header.cartBadge()).toHaveText("1");

    // User actions: proceed to checkout
    await cartPage.proceedToCheckout().click();

    // Verification: total matches expected
    await expect(checkoutPage.total()).toHaveText(expectedTotal);
  });
});
