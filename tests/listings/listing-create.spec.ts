import {
  test,
  expect
} from '@playwright/test';

import {
  newListing
} from '../../utils/test-data';

import path from 'path';

test.describe('Create Listing Tests', () => {

  test('should create a new listing with image', async ({ page }) => {

    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    test.skip(
      !username || !password,
      'TEST_USERNAME and TEST_PASSWORD are required'
    );

    // 1. Login
    await page.goto('/login');

    await page.locator(
      'input[name="username"]'
    ).fill(username!);

    await page.locator(
      'input[name="password"]'
    ).fill(password!);

    await page.getByRole('button', {
      name: /login/i
    }).click();

    await expect(page).toHaveURL(/\/listings/);

    // 2. Open Create Listing page
    await page.goto('/listings/new');

    await expect(
      page.getByRole('heading', {
        name: /create a new listing/i
      })
    ).toBeVisible();

    // 3. Title
    await page.locator(
      'input[name="listing[title]"]'
    ).fill(newListing.title);

    // 4. Description
    await page.locator(
      'textarea[name="listing[description]"]'
    ).fill(newListing.description);

    // 5. Image Upload
    const imagePath = path.resolve(
      'test-assets/test-image.jpg'
    );

    await page.locator(
      'input[name="listing[image]"]'
    ).setInputFiles(imagePath);

    // 6. Price
    await page.locator(
      'input[name="listing[price]"]'
    ).fill(String(newListing.price));

    // 7. Country
    await page.locator(
      'input[name="listing[country]"]'
    ).fill(newListing.country);

    // 8. Location
    await page.locator(
      'input[name="listing[location]"]'
    ).fill(newListing.location);

    // 9. Category
    await page.locator(
      'select[name="listing[category]"]'
    ).selectOption(newListing.category);

    // 10. Submit
    await page.getByRole('button', {
      name: /^add$/i
    }).click();

    // 11. Verify listing was created
    await expect(
      page.getByText(
        newListing.title,
        { exact: true }
      )
    ).toBeVisible();
  });

});
