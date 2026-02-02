import { test as base, type Page } from "@playwright/test";

const TEST_USER = {
  name: "Test User",
  email: "test@myapp.com",
  password: "TestPassword123!",
};

async function createTestUser(page: Page) {
  await page.goto("/sign-up");
  await page.getByLabel("Name").fill(TEST_USER.name);
  await page.getByLabel("Email").fill(TEST_USER.email);
  await page.getByLabel("Password").fill(TEST_USER.password);
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL("/dashboard");
}

async function signIn(page: Page) {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(TEST_USER.email);
  await page.getByLabel("Password").fill(TEST_USER.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("/dashboard", { timeout: 5000 });
}

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    try {
      await signIn(page);
    } catch {
      await createTestUser(page);
    }
    await use(page);
  },
});

export { expect } from "@playwright/test";
export { TEST_USER };
