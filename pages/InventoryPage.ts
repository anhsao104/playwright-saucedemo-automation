import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryItem } from '../components/InventoryItem';
import { SortOption } from '../types/SortOption';

/**
 * InventoryPage models the inventory (product listing) page.
 * Assumes the user is already authenticated via storageState.
 */
export class InventoryPage extends BasePage {
  readonly items: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);

    this.items = page.locator('.inventory_item');

    this.sortDropdown = this.getByDataTest('product-sort-container');

    this.cartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Navigate directly to inventory page.
   * Required when using Playwright storageState.
   */
  async open() {
    await this.page.goto('/inventory.html');
    await this.assertLoaded();
  }

  /**
   * Assert inventory page is loaded.
   */
  async assertLoaded() {
    await expect(this.items.first()).toBeVisible();
  }

  /**
   * Return all inventory items as InventoryItem components.
   */
  async getItems(): Promise<InventoryItem[]> {
    const itemLocators = await this.items.all();
    return itemLocators.map(locator => new InventoryItem(locator));
  }

  /**
   * Sort inventory by dropdown value.
   */
  async sortBy(selectValue: SortOption | string) {
    await this.sortDropdown.selectOption({ value: selectValue });
  }

  async sortAndGetNames(option: SortOption): Promise<string[]> {
    await this.sortBy(option);
    return this.getItemNames();
  }

  async sortAndGetPrices(option: SortOption): Promise<number[]> {
    await this.sortBy(option);
    return this.getItemPrices();
  }

  /**
   * Get product names in current UI order.
   */
  async getItemNames(): Promise<string[]> {
    return this.page
      .locator('.inventory_item_name')
      .allTextContents();
  }

  /**
   * Get product prices in current UI order.
   */
  async getItemPrices(): Promise<number[]> {
    const prices = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    return prices.map(p => Number(p.replace('$', '')));
  }

  /**
   * Return first inventory item as component.
   */
  async getFirstItem(): Promise<InventoryItem> {
    return new InventoryItem(this.items.first());
  }

  /**
   * Add item to cart using its data-test id.
   * Example: add-to-cart-sauce-labs-backpack
   */
  async addItem(testId: string) {
    await this.getByDataTest(testId).click();
  }

  /**
   * Navigate to cart page.
   */
  async goToCart() {
    await this.cartLink.click();
  }
}
