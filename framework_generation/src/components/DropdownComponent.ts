// path: src/components/DropdownComponent.ts
import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

/**
 * Reusable dropdown/context-menu component.
 * Scoped to a trigger button; exposes typed option click.
 */
export class DropdownComponent extends BaseComponent {
  /**
   * @param page - Playwright Page instance.
   * @param triggerLocator - Locator for the button that opens the dropdown.
   */
  constructor(page: Page, triggerLocator: Locator) {
    super(page, triggerLocator);
  }

  /**
   * Open the dropdown by clicking the trigger.
   */
  async open(): Promise<void> {
    this.logger.info("Opening dropdown");
    await this.root.click();
  }

  /**
   * Click a menu item by its visible label.
   * @param option - Exact label of the menu item to click.
   */
  async selectOption(option: string): Promise<void> {
    this.logger.info(`Selecting option: ${option}`);
    await this.page
      .getByRole("menu")
      .getByRole("menuitem", { name: option })
      .click();
  }

  /**
   * Open the dropdown and click a named option in one step.
   * @param option - Exact label of the menu item.
   */
  async chooseOption(option: string): Promise<void> {
    await this.open();
    await this.selectOption(option);
  }
}
