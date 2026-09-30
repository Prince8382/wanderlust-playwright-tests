import {
  test,
  expect
} from '@playwright/test';

import {
  testReview
} from '../../utils/test-data';

test.describe('Review Tests', () => {

  test('should submit a review', async ({ page }) => {

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

    // Make sure login succeeded
    await expect(page).toHaveURL(/\/listings/);

    // 2. Open listing
    await page.goto(
      `/listings/${listingId}`
    );

    // 3. Check review form
const rating = page.locator(
  `input[name="review[rating]"][value="${testReview.rating}"]`
);

const comment = page.locator(
  'textarea[name="review[comment]"]'
);

await expect(rating).toBeVisible();
await expect(comment).toBeVisible();

// 4. Select rating by clicking its label
await page.locator(
  `label[for="first-rate${testReview.rating}"]`
).click();

// 5. Enter comment
await comment.fill(
  testReview.comment
);

// 6. Submit review
await page.getByRole('button', {
  name: /submit/i
}).click();

// 7. Verify review was added
await expect(
  page.getByText(
    testReview.comment,
    { exact: true }
  )
).toBeVisible();

  });

});
