import { test, expect } from '../baseTest';
import { buildCustomer } from '../../data/customerBuilder';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('User completes checkout with validated cart details and totals', async ({
  inventoryPage,
  page
}) => {
  /**
   * PURPOSE:
   * Validate full cart and checkout flow including:
   * - Product identity in cart
   * - Correct price calculations
   *
   * EXPECTED RESULT:
   * Cart contents are correct and totals are accurate.
   */

  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Navigate to inventory using authenticated storageState
  await inventoryPage.open();

  // Add two products
  await inventoryPage.addItem('add-to-cart-sauce-labs-backpack');
  await inventoryPage.addItem('add-to-cart-sauce-labs-bike-light');
  await inventoryPage.goToCart();

  // Cart validations
  await cartPage.assertItemCount(2);

  const cartItems = await cartPage.getCartItems();
  const itemNames = await Promise.all(cartItems.map(i => i.getName()));

  expect(itemNames).toContain('Sauce Labs Backpack');
  expect(itemNames).toContain('Sauce Labs Bike Light');

  // Remove one item and re-validate
  await cartPage.removeItemByTestId('remove-sauce-labs-bike-light');
  await cartPage.assertItemCount(1);

  // Re-fetch items after removal
  const updatedCartItems = await cartPage.getCartItems();
  const updatedItemNames = await Promise.all(
    updatedCartItems.map(i => i.getName())
  );

  expect(updatedItemNames).toContain('Sauce Labs Backpack');
  expect(updatedItemNames).not.toContain('Sauce Labs Bike Light');

  // Checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCustomerInfo(buildCustomer());

  const { subtotal, tax, total } =
    await checkoutPage.getSummaryValues();

  expect(subtotal + tax).toBeCloseTo(total, 2);

  await checkoutPage.finishCheckout();
  await checkoutPage.assertOrderCompleted();
});
