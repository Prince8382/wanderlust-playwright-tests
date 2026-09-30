import {
  test,
  expect
} from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

  test('should login with valid credentials', async ({
    page
  }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.TEST_USERNAME || 'your_username',
      process.env.TEST_PASSWORD || 'your_password'
    );

    await expect(page).toHaveURL(
      /\/listings/
    );
  });

});
