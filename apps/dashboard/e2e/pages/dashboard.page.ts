import type { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly welcomeCard: Locator;
  readonly settingsLink: Locator;
  readonly signOutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Dashboard" });
    this.welcomeCard = page.getByText("GraphQL Connection");
    this.settingsLink = page.getByRole("navigation").getByText("Settings");
    this.signOutLink = page.getByRole("navigation").getByText("Sign out");
  }

  async goto() {
    await this.page.goto("/dashboard");
  }

  async navigateToSettings() {
    await this.settingsLink.click();
  }

  async signOut() {
    await this.signOutLink.dispatchEvent("click");
  }
}
