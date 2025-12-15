import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async assertUrlContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  protected getByDataTest(testId: string) {
    return this.page.locator(`[data-test="${testId}"]`);
  }
}
