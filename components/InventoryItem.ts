// components/InventoryItem.ts
import { Locator, expect } from '@playwright/test';

export class InventoryItem {
  constructor(private readonly root: Locator) {}

  async assertHasName() {
    await expect(this.root.locator('.inventory_item_name')).toBeVisible();
  }

  async assertHasImage() {
    await expect(this.root.locator('img')).toBeVisible();
  }

  async assertHasPrice() {
    await expect(this.root.locator('.inventory_item_price')).toBeVisible();
  }

  async assertHasAddToCartButton() {
    await expect(
      this.root.locator('button[data-test^="add-to-cart"]')
    ).toBeVisible();
  }
}
