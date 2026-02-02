import { test, expect } from "./fixtures/auth.fixture";
import { DashboardPage } from "./pages/dashboard.page";

test.describe("Dashboard", () => {
  test("should display dashboard after login", async ({
    authenticatedPage,
  }) => {
    const dashboard = new DashboardPage(authenticatedPage);
    await expect(dashboard.heading).toBeVisible();
    await expect(dashboard.welcomeCard).toBeVisible();
  });

  test("should navigate to settings", async ({ authenticatedPage }) => {
    const dashboard = new DashboardPage(authenticatedPage);
    await dashboard.navigateToSettings();
    await expect(authenticatedPage).toHaveURL("/dashboard/settings");
    await expect(
      authenticatedPage.getByRole("heading", { name: "Settings" }),
    ).toBeVisible();
  });

  test("should sign out and redirect to sign-in", async ({
    authenticatedPage,
  }) => {
    const dashboard = new DashboardPage(authenticatedPage);
    await dashboard.signOut();
    await authenticatedPage.waitForURL("/sign-in", { timeout: 10000 });
  });
});
