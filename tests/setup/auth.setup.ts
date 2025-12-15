import { test as setup, expect } from '@playwright/test';
import { users } from '../../data/users';
import { LoginPage } from '../../pages/LoginPage';

const authFile = '.auth/standard-user.json';

setup('authenticate as standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(users.standard);

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: authFile });
});
