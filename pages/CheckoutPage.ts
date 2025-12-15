import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Customer } from '../types/Customer';


export class CheckoutPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zip: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly total: Locator;
    readonly confirmation: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = this.getByDataTest('firstName');
        this.lastName = this.getByDataTest('lastName');
        this.zip = this.getByDataTest('postalCode');
        this.continueBtn = this.getByDataTest('continue');
        this.finishBtn = this.getByDataTest('finish');
        this.total = page.locator('.summary_total_label');
        this.confirmation = page.locator('.complete-header');
    }

    async fillCustomerInfo(customer: Customer) {
        await this.firstName.fill(customer.firstName);
        await this.lastName.fill(customer.lastName);
        await this.zip.fill(customer.zip);
        await this.continueBtn.click();
    }

    async getSummaryValues() {
        const subtotalText = await this.page
            .locator('.summary_subtotal_label')
            .textContent();

        const taxText = await this.page
            .locator('.summary_tax_label')
            .textContent();

        const totalText = await this.page
            .locator('.summary_total_label')
            .textContent();

        const subtotal = Number(
            subtotalText?.replace('Item total: $', '')
        );
        const tax = Number(
            taxText?.replace('Tax: $', '')
        );
        const total = Number(
            totalText?.replace('Total: $', '')
        );

        return { subtotal, tax, total };
    }

    async assertTotalDisplayed() {
        await expect(this.total).toContainText('Total');
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }

    async assertOrderCompleted() {
        await expect(this.confirmation)
            .toHaveText('Thank you for your order!');
    }
}
