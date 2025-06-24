import { test, expect } from '@playwright/test';

test('login with valid credentials using getByLabel and getByRole', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByLabel('Username').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('login using XPath and CSS selectors', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  // Using CSS selector for username input
  await page.locator('input[data-test="username"]').fill('standard_user');
  // Using XPath for password input
  await page.locator('//input[@data-test="password"]').fill('secret_sauce');
  // Using CSS selector for login button
  await page.locator('input[type="submit"]').click();
  await expect(page).toHaveURL(/inventory/);
});
