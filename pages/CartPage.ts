import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartItem } from '../components/CartItem';

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutBtn = this.getByDataTest('checkout');
    }
    async getCartItems(): Promise<CartItem[]> {
        const items = await this.cartItems.all();
        return items.map(item => new CartItem(item));
    }

    async assertItemCount(count: number) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async removeItemByTestId(testId: string) {
        await this.getByDataTest(testId).click();
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click();
    }
}
