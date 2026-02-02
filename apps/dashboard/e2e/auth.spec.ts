import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

test.describe("Authentication", () => {
  test("should show sign-in page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test("should navigate to sign-up from sign-in", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.signUpLink.click();
    await expect(page).toHaveURL("/sign-up");
  });

  test("should show error for invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.signIn("invalid@example.com", "wrongpassword");
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("should show sign-up page with name field", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });
});
