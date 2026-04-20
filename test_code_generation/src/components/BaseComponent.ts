// path: src/components/BaseComponent.ts
import { Page, Locator } from "@playwright/test";
import { Logger } from "../utils/logger";

/**
 * Base class for all Component Objects.
 * Scopes interactions to a root locator within the page.
 */
export abstract class BaseComponent {
  protected readonly page: Page;
  protected readonly root: Locator;
  protected readonly logger: Logger;

  /**
   * @param page - Playwright Page instance.
   * @param root - Root locator that scopes this component.
   */
  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Check whether the component root is visible.
   */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  /**
   * Wait for the component root to become visible.
   */
  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: "visible" });
  }
}
