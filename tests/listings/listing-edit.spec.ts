import {
  test,
  expect
} from '@playwright/test';

import {
  updatedListing
} from '../../utils/test-data';

test.describe('Edit Listing Tests', () => {

  test('should edit an existing listing', async ({ page }) => {

    const listingId = process.env.TEST_LISTING_ID;
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    test.skip(
      !listingId || !username || !password,
      'TEST_LISTING_ID, TEST_USERNAME and TEST_PASSWORD are required'
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

    // 2. Open edit page
    await page.goto(
      `/listings/${listingId}/edit`
    );

    // Make sure edit page actually opened
    await expect(
      page.getByRole('heading', {
        name: /edit your listing/i
      })
    ).toBeVisible();

    // 3. Update title
    await page.locator(
      'input[name="listing[title]"]'
    ).fill(updatedListing.title);

    // 4. Update description
    if (updatedListing.description) {
      await page.locator(
        'textarea[name="listing[description]"]'
      ).fill(updatedListing.description);
    }

    // 5. Update price
    if (updatedListing.price) {
      await page.locator(
        'input[name="listing[price]"]'
      ).fill(String(updatedListing.price));
    }

    // 6. Update country
    if (updatedListing.country) {
      await page.locator(
        'input[name="listing[country]"]'
      ).fill(updatedListing.country);
    }

    // 7. Update location
    if (updatedListing.location) {
      await page.locator(
        'input[name="listing[location]"]'
      ).fill(updatedListing.location);
    }

    // 8. Update category
    if (updatedListing.category) {
      await page.locator(
        'select[name="listing[category]"]'
      ).selectOption(updatedListing.category);
    }

    // 9. Submit
    await page.getByRole('button', {
      name: /update listing/i
    }).click();

    // 10. Should return to listing
    await expect(page).toHaveURL(
      new RegExp(`/listings/${listingId}`)
    );

    // 11. Updated title should be visible
    await expect(
      page.getByText(
        updatedListing.title,
        { exact: true }
      )
    ).toBeVisible();
  });

});
