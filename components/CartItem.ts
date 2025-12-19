import { Locator, expect } from '@playwright/test';

/**
 * CartItem represents a single product row in the cart.
 * It encapsulates cart-specific UI structure and behavior.
 */
export class CartItem {
  constructor(private readonly root: Locator) {}

  async getName(): Promise<string> {
    const name = await this.root
      .locator('[data-test="inventory-item-name"]')
      .textContent();
    return name?.trim() || '';
  }

  async getPrice(): Promise<number> {
    const priceText = await this.root
      .locator('[data-test="inventory-item-price"]')
      .textContent();

    return Number(priceText?.replace('$', ''));
  }

  async assertNameVisible() {
    await expect(this.root.locator('[data-test="inventory-item-name"]')).toBeVisible();
  }

  async assertPriceVisible() {
    await expect(this.root.locator('[data-test="inventory-item-price"]')).toBeVisible();
  }
}
