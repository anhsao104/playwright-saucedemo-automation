import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

type Fixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  }
});

export { expect };
