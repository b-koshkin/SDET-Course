// path: src/pages/ExamplePage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page Object for the Example resource list page.
 * Demonstrates POM + refactored dropdown interaction.
 */
export class ExamplePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the Example page.
   */
  async goto(): Promise<void> {
    await this.navigate("/examples");
    await this.waitForPageLoad();
  }

  /**
   * Click the row action button to open the dropdown menu for a given item.
   * @param itemName - The visible name/label of the target item row.
   */
  async openRowDropdown(itemName: string): Promise<void> {
    this.logger.info(`Opening dropdown for item: ${itemName}`);
    const row = this.page.getByRole("row", { name: itemName });
    await row.getByRole("button", { name: "Actions" }).click();
  }

  /**
   * Click a specific option in the open dropdown menu.
   * Replaces clickDropdownDelete(), clickDropdownEdit(), clickDropdownArchive().
   * @param option - The visible label of the dropdown option (e.g. 'Delete', 'Edit', 'Archive').
   */
  async clickDropdownByName(option: string): Promise<void> {
    this.logger.info(`Clicking dropdown option: ${option}`);
    await this.page
      .getByRole("menu")
      .getByRole("menuitem", { name: option })
      .click();
  }

  /**
   * Open the row dropdown and click a named option in one step.
   * @param itemName - Row item label.
   * @param option - Dropdown option label.
   */
  async selectRowAction(itemName: string, option: string): Promise<void> {
    await this.openRowDropdown(itemName);
    await this.clickDropdownByName(option);
  }

  /**
   * Get the heading text displayed on the page.
   */
  async getHeading(): Promise<string> {
    return this.page.getByRole("heading", { level: 1 }).innerText();
  }

  /**
   * Locator for an edit/detail dialog triggered by a row action.
   */
  getDialog(): Locator {
    return this.page.getByRole("dialog");
  }

  /**
   * Locator for a confirmation alert dialog (e.g. delete confirmation).
   */
  getAlertDialog(): Locator {
    return this.page.getByRole("alertdialog");
  }

  /**
   * Locator for the status/toast notification area.
   */
  getStatusMessage(): Locator {
    return this.page.getByRole("status");
  }
}
