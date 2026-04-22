import { Page, expect } from "@playwright/test";

export class PlaywrightDocsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async clickGetStarted() {
    await this.page.getByRole("link", { name: "Get started" }).click();
  }

  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text));
  }

  async expectInstallationHeadingVisible() {
    await expect(
      this.page.getByRole("heading", { name: "Installation" }),
    ).toBeVisible();
  }

  async expectNavLinksVisible(labels: string[]) {
    for (const label of labels) {
      const navLink = this.page.getByRole("link", { name: label, exact: true });
      const navButton = this.page.getByRole("button", {
        name: label,
        exact: true,
      });
      const navText = this.page.getByText(label, { exact: true }).first();
      const navItem = navLink.or(navButton).or(navText).first();
      await expect(navItem).toBeVisible();
    }
  }

  async expectNavItemVisible(name: string) {
    const nav = this.page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
  }

  async clickNavLinkAndExpectUrl(name: string, urlPattern: RegExp) {
    const nav = this.page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(this.page).toHaveURL(urlPattern);
  }

  async expectNavLinkAccessibleName(name: string) {
    const nav = this.page.getByRole("navigation", { name: "Main" });
    const link = nav.getByRole("link", { name, exact: true });
    await expect(link).toHaveAccessibleName(name);
  }

  async expectNavLinkAbsent(name: string) {
    const nav = this.page.getByRole("navigation", { name: "Main" });
    await expect(
      nav.getByRole("link", { name, exact: true }),
    ).not.toBeVisible();
  }

  async expectPageSectionVisible(text: string) {
    await expect(
      this.page.getByText(text, { exact: true }).first(),
    ).toBeVisible();
  }
}
