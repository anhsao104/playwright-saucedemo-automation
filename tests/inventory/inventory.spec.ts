import { test, expect } from '../baseTest';

test.describe('Inventory', () => {
  test('Inventory list loads correctly', async ({ inventoryPage }) => {
    /**
     * PURPOSE:
     * Validate inventory page loads with visible items.
     *
     * EXPECTED RESULT:
     * At least one inventory item is displayed with required elements.
     */

    await inventoryPage.open();

    await expect(inventoryPage.items.first()).toBeVisible();

    const items = await inventoryPage.getItems();
    expect(items.length).toBeGreaterThan(0);

    for (const item of items) {
      await item.assertHasName();
      await item.assertHasImage();
      await item.assertHasPrice();
      await item.assertHasAddToCartButton();
    }
  });
});
