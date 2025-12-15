import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.ts';

export class LoginPage extends BasePage {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly error: Locator;

    constructor(page: Page) {
        super(page);
        this.username = this.getByDataTest('username');
        this.password = this.getByDataTest('password');
        this.loginBtn = this.getByDataTest('login-button');
        this.error = this.getByDataTest('error');
    }

    async open() {
        await this.page.goto('/');
    }

    async login(user: { username: string; password: string }) {
        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.loginBtn.click();
    }
}
