import { test, expect } from '../baseTest';
import { SortOption } from '../../types/SortOption';

test.describe('Inventory sorting', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // When using storageState, we must navigate explicitly
    await inventoryPage.open();
  });

  test('Sort by name A → Z', async ({ inventoryPage }) => {
    /**
     * PURPOSE:
     * Verify products are sorted alphabetically from A to Z.
     *
     * EXPECTED RESULT:
     * Product names appear in ascending alphabetical order.
     */

    const names = await inventoryPage.sortAndGetNames(SortOption.NAME_ASC);

    const expected = [...names].sort();

    expect(names).toEqual(expected);
  });

  test('Sort by name Z → A', async ({ inventoryPage }) => {
    /**
     * PURPOSE:
     * Verify products are sorted alphabetically from Z to A.
     *
     * EXPECTED RESULT:
     * Product names appear in descending alphabetical order.
     */

    const names = await inventoryPage.sortAndGetNames(SortOption.NAME_DESC);

    const expected = [...names].sort().reverse();

    expect(names).toEqual(expected);
  });

  test('Sort by price low → high', async ({ inventoryPage }) => {
    /**
     * PURPOSE:
     * Verify products are sorted by price from lowest to highest.
     *
     * EXPECTED RESULT:
     * Product prices increase monotonically.
     */

    const prices = await inventoryPage.sortAndGetPrices(SortOption.PRICE_ASC);

    const expected = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(expected);
  });

  test('Sort by price high → low', async ({ inventoryPage }) => {
    /**
     * PURPOSE:
     * Verify products are sorted by price from highest to lowest.
     *
     * EXPECTED RESULT:
     * Product prices decrease monotonically.
     */

    const prices = await inventoryPage.sortAndGetPrices(SortOption.PRICE_DESC);

    const expected = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(expected);
  });
});
