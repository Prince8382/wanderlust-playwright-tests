import { test, expect } from '@playwright/test';

test.describe('Delete Listing Tests', () => {

  test('should delete an existing listing', async ({ page }) => {

    const listingId = process.env.TEST_LISTING_ID;
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    test.skip(
      !listingId || !username || !password,
      'TEST_LISTING_ID, TEST_USERNAME and TEST_PASSWORD are required'
    );

    // Login
    await page.goto('/login');

    await page.locator('input[name="username"]').fill(username!);
    await page.locator('input[name="password"]').fill(password!);

    await page.getByRole('button', {
      name: /login/i
    }).click();

    await expect(page).toHaveURL(/\/listings/);

    // Open listing
    await page.goto(`/listings/${listingId}`);

    // Delete button should be visible because logged-in user is owner
    const deleteForm = page.locator(
  `form[action="/listings/${listingId}?_method=DELETE"]`
);

const deleteButton = deleteForm.getByRole(
  'button',
  { name: /^delete$/i }
);

await expect(deleteButton).toBeVisible();

page.once('dialog', async dialog => {
  await dialog.accept();
});

await deleteButton.click();


    // Accept confirmation 
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await deleteButton.click();

    // redirect to listings page
    await expect(page).toHaveURL(/\/listings$/);
  });

});
