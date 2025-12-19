import { test, expect } from '../baseTest';
import { SortOption } from '../../types/SortOption';

test.describe('Inventory sorting', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    // When using storageState, we must navigate explicitly
    await inventoryPage.open();
  });

  test('Sort by name A → Z', async ({ inventoryPage }) => {

    // Step 1: Force the UI into the OPPOSITE state (Z → A) first
    await inventoryPage.sortAndGetNames(SortOption.NAME_DESC);

    // // Step 2: Apply the target "Name (A to Z)" sorting
    await inventoryPage.sortAndGetNames(SortOption.NAME_ASC);

    // Step 3: Capture names after sorting
    const afterNames = await inventoryPage.getItemNames();

    // Step 4: Compute the expected sorted order (ascending alphabetical) from the original data
    const expected = [...afterNames].sort((a, b) => a.localeCompare(b));

    // Primary assertion: After sorting, names must exactly match the expected ascending order
    expect(afterNames).toEqual(expected);

    // Extra monotonic ascending check (case-insensitive safe)
    for (let i = 0; i < afterNames.length - 1; i++) {
      expect(afterNames[i].localeCompare(afterNames[i + 1])).toBeLessThanOrEqual(0);
    }

  });

  test('Sort by name Z → A', async ({ inventoryPage }) => {
    // Step 1: Force the UI into the OPPOSITE state (A → Z) first.
    // This ensures that if the Z->A button is broken, the test will definitely fail
    // because the list will remain in A->Z order.
    await inventoryPage.sortAndGetNames(SortOption.NAME_ASC);

    // Step 2: Apply the target "Name (Z to A)" sorting
    await inventoryPage.sortAndGetNames(SortOption.NAME_DESC);

    // Step 3: Capture names after sorting
    const afterNames = await inventoryPage.getItemNames();

    // Step 4: Create a trusted "truth" by manually sorting the captured data
    // We use b.localeCompare(a) to sort Z -> A
    const expected = [...afterNames].sort((a, b) => b.localeCompare(a));

    // Assertion 1: Verify the list matches our manually sorted version
    expect(afterNames).toEqual(expected);

    // Assertion 2 (Optional but helpful): Monotonic check for Z -> A
    // Ensures every item is "greater than" or equal to the next item alphabetically
    for (let i = 0; i < afterNames.length - 1; i++) {
      // A result of >= 0 means the current item comes AFTER or is equal to the next item
      expect(afterNames[i].localeCompare(afterNames[i + 1])).toBeGreaterThanOrEqual(0);
    }
  });

  test('Sort by price low → high', async ({ inventoryPage }) => {
    // Step 1: Force the UI into the OPPOSITE state (high → low) first
    await inventoryPage.sortAndGetPrices(SortOption.PRICE_DESC);

    // Step 2: Apply the target "Price (low to high)" sorting
    await inventoryPage.sortAndGetPrices(SortOption.PRICE_ASC);

    // Step 3: Capture prices after sorting
    const afterPrices = await inventoryPage.getItemPrices();

    // Step 4: Create a trusted "truth" by manually sorting the captured data
    // We use a - b to sort low -> high
    const expected = [...afterPrices].sort((a, b) => a - b);

    // Assertion 1: Verify the list matches our manually sorted version
    expect(afterPrices).toEqual(expected);

    // Assertion 2 (Optional but helpful): Monotonic check for low -> high
    // Ensures every price is less than or equal to the next price
    for (let i = 0; i < afterPrices.length - 1; i++) {
      expect(afterPrices[i]).toBeLessThanOrEqual(afterPrices[i + 1]);
    }
  });

  test('Sort by price high → low', async ({ inventoryPage }) => {
    // Step 1: Force the UI into the OPPOSITE state (low → high) first
    await inventoryPage.sortAndGetPrices(SortOption.PRICE_ASC);

    // Step 2: Apply the target "Price (high to low)" sorting
    await inventoryPage.sortAndGetPrices(SortOption.PRICE_DESC);

    // Step 3: Capture prices after sorting
    const afterPrices = await inventoryPage.getItemPrices();

    // Step 4: Create a trusted "truth" by manually sorting the captured data
    // We use b - a to sort high -> low
    const expected = [...afterPrices].sort((a, b) => b - a);

    // Assertion 1: Verify the list matches our manually sorted version
    expect(afterPrices).toEqual(expected);

    // Assertion 2 (Optional but helpful): Monotonic check for high -> low
    // Ensures every price is greater than or equal to the next price
    for (let i = 0; i < afterPrices.length - 1; i++) {
      expect(afterPrices[i]).toBeGreaterThanOrEqual(afterPrices[i + 1]);
    }
  });
});
