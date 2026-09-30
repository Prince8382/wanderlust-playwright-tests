import {
  test,
  expect
} from '@playwright/test';

import { SignupPage } from '../../pages/SignupPage';

test.describe('Signup Tests', () => {

  test('should open signup page', async ({
    page
  }) => {

    const signupPage = new SignupPage(page);

    await signupPage.goto();

    await expect(page).toHaveURL(
      /\/signup/
    );
  });

});
