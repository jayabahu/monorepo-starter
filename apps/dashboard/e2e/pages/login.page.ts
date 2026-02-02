import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly signUpLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.signUpLink = page.getByRole("link", { name: "Create one" });
    this.errorMessage = page.getByText("Invalid email or password");
  }

  async goto() {
    await this.page.goto("/sign-in");
  }

  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
