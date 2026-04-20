// path: tests/e2e/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";
import { DashboardPage } from "../../src/pages/DashboardPage";

test.describe("Login page", () => {
  test("login with Remember me checked navigates to dashboard", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.emailInput().fill("user@example.com");
    await loginPage.passwordInput().fill("password123");
    await loginPage.rememberMeCheckbox().check();
    await loginPage.submitButton().click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(dashboardPage.userAvatar()).toBeVisible();
  });
});
