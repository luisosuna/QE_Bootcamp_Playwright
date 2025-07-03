import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('login with various assertion types', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Navigate to login page
  await loginPage.goto();

  // 1. Auto-retrying assertion: Check login form is visible
  await expect(await loginPage.isLoginButtonVisible()).toBeTruthy();

  // Perform login
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Verify inventory page
  await inventoryPage.isInventoryPageVisible();

  // 3. Non-retrying assertion: Check page title immediately after navigation
  const title = await inventoryPage.getPageTitle();
  expect(title).toBe('Swag Labs'); // Non-retrying
});
