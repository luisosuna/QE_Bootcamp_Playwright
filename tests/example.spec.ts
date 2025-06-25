import { test, expect } from '@playwright/test';

test('login with various assertion types', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // 1. Auto-retrying assertion: Check login form is visible
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  // Fill credentials
  await page.getByLabel('Username').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 2. Auto-retrying assertion: URL should contain 'inventory'
  await expect(page).toHaveURL(/inventory/);

  // 3. Non-retrying assertion: Check page title immediately after navigation
  const title = await page.title();
  expect(title).toBe('Swag Labs'); // Non-retrying

  // 4. Soft assertion: Check the presence of the shopping cart icon
  await expect.soft(page.locator('.shopping_cart_link')).toBeVisible();

  // 5. Soft assertion: Check the first product is visible
  await expect.soft(page.locator('.inventory_item').first()).toBeVisible();
});
