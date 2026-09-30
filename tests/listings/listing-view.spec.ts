import {
  test,
  expect
} from '../../fixtures/test-fixtures';

test.describe('Listing View Tests', () => {

  test('should display listings page', async ({
    page,
    listingsPage
  }) => {

    await listingsPage.goto();

    await expect(page).toHaveURL(
      /\/listings/
    );

    await expect(
      page.locator('.listing-card').first()
    ).toBeVisible();
  });

});
