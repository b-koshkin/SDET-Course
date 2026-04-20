// path: tests/e2e/auth.spec.ts
import { test, expect } from "@playwright/test";
import { AuthPage } from "../../src/pages/AuthPage";
import { HomePage } from "../../src/pages/HomePage";
import { validUser, invalidUser } from "../../src/fixtures/testData";

test.describe("Auth", () => {
  test("successful login shows avatar", async ({ page }) => {
    const authPage = new AuthPage(page);
    const homePage = new HomePage(page);

    // Initialization: open login
    await authPage.open();

    // User actions: fill credentials, submit
    await authPage.login(validUser.username, validUser.password);

    // Verification: successful login → avatar visible
    await expect(homePage.avatar()).toBeVisible();
  });

  test("invalid login shows error message", async ({ page }) => {
    const authPage = new AuthPage(page);

    // Initialization: open login
    await authPage.open();

    // User actions: invalid login
    await authPage.login(invalidUser.username, invalidUser.password);

    // Verification: error message visible
    await expect(authPage.errorMessage()).toBeVisible();
  });
});
