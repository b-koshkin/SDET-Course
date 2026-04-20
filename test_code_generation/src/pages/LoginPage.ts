// path: src/pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate("/login");
    await this.waitForPageLoad();
  }

  emailInput(): Locator {
    return this.page.getByTestId("email");
  }

  passwordInput(): Locator {
    return this.page.getByTestId("password");
  }

  rememberMeCheckbox(): Locator {
    return this.page.getByTestId("remember-me");
  }

  submitButton(): Locator {
    return this.page.getByTestId("submit");
  }

  async login(
    email: string,
    password: string,
    rememberMe = false,
  ): Promise<void> {
    this.logger.info(`Logging in as: ${email}`);
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox().check();
    }
    await this.submitButton().click();
  }
}
