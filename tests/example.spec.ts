import { test, expect } from '@playwright/test';

async function navigateToLoginPage(page) {
  await page.goto('https://www.saucedemo.com');
}

async function login(page, username: string, password: string) {
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function verifyInventoryPage(page) {
  await expect(page).toHaveURL(/inventory/);
  await expect.soft(page.locator('.shopping_cart_link')).toBeVisible();
  await expect.soft(page.locator('.inventory_item').first()).toBeVisible();
}

test('login with various assertion types', async ({ page }) => {
  // Navigate to login page
  await navigateToLoginPage(page);

  // 1. Auto-retrying assertion: Check login form is visible
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  // Perform login
  await login(page, 'standard_user', 'secret_sauce');

  // 2. Verify inventory page
  await verifyInventoryPage(page);

  // 3. Non-retrying assertion: Check page title immediately after navigation
  const title = await page.title();
  expect(title).toBe('Swag Labs'); // Non-retrying
});
