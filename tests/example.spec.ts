import { test, expect } from '@playwright/test';

test('login with valid credentials using getByLabel and getByRole', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByLabel('Username').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});
