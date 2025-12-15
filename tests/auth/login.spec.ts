import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../data/users';

test.describe('Authentication', () => {
  test('Login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login({
      username: 'invalid_user',
      password: 'wrong_password'
    });

    await expect(loginPage.error).toBeVisible();
  });

  test('Login succeeds with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(users.standard);

    await expect(page).toHaveURL(/inventory/);
  });
});
