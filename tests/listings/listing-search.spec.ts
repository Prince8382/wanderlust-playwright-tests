import {
  test,
  expect
} from '../../fixtures/test-fixtures';

test.describe('Listing Search Tests', () => {

  test('should search listings', async ({
    page,
    listingsPage
  }) => {

    await listingsPage.goto();

    await listingsPage.search('mountain');

    await expect(page).toHaveURL(
      /\/listings\/search\?q=mountain/i
    );
  });


  test('should filter listings by mountain category', async ({
    page,
    listingsPage
  }) => {

    await listingsPage.filterByCategory(
      'mountain'
    );

    await expect(page).toHaveURL(
      /\/listings\?category=mountain/
    );
  });

});
