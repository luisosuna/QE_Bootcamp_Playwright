import { Page, expect } from '@playwright/test'; // Ensure `expect` is imported

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isInventoryPageVisible() {
    // Verify the URL contains '/inventory'
    await expect(this.page).toHaveURL(/.*\/inventory/);

    // Verify the shopping cart link is visible
    await expect.soft(this.page.locator('.shopping_cart_link')).toBeVisible();

    // Verify at least one inventory item is visible
    await expect.soft(this.page.locator('.inventory_item').first()).toBeVisible();
  }

  async getPageTitle() {
    // Return the page title
    return this.page.title();
  }
}