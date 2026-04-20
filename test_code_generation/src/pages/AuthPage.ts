// path: src/pages/AuthPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate("/login");
    await this.waitForPageLoad();
  }

  username(): Locator {
    return this.page.getByTestId("username-input");
  }

  password(): Locator {
    return this.page.getByTestId("password-input");
  }

  submit(): Locator {
    return this.page.getByTestId("login-btn");
  }

  errorMessage(): Locator {
    return this.page.getByTestId("error-message");
  }

  async login(user: string, pass: string): Promise<void> {
    this.logger.info(`Logging in as: ${user}`);
    await this.username().fill(user);
    await this.password().fill(pass);
    await this.submit().click();
  }
}
