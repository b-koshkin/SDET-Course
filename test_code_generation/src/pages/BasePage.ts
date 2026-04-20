// path: src/pages/BasePage.ts
import { Page } from "@playwright/test";
import { Logger } from "../utils/logger";

/**
 * Base class for all Page Objects.
 * Provides common navigation and element interaction utilities.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Navigate to a given URL path.
   * @param path - Relative or absolute URL to navigate to.
   */
  async navigate(path: string): Promise<void> {
    this.logger.info(`Navigating to: ${path}`);
    await this.page.goto(path);
  }

  /**
   * Wait for the page to reach a stable loaded state.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get the current page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get the current page URL.
   */
  getUrl(): string {
    return this.page.url();
  }
}
