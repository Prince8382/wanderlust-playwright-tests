import {
  test as base,
  expect
} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ListingsPage } from '../pages/ListingsPage';
import { NewListingPage } from '../pages/NewListingPage';
import { EditListingPage } from '../pages/EditListingPage';
import { ListingDetailsPage } from '../pages/ListingDetailsPage';

type Fixtures = {
  loginPage: LoginPage;
  listingsPage: ListingsPage;
  newListingPage: NewListingPage;
  editListingPage: EditListingPage;
  listingDetailsPage: ListingDetailsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  listingsPage: async ({ page }, use) => {
    await use(new ListingsPage(page));
  },

  newListingPage: async ({ page }, use) => {
    await use(new NewListingPage(page));
  },

  editListingPage: async ({ page }, use) => {
    await use(new EditListingPage(page));
  },

  listingDetailsPage: async ({ page }, use) => {
    await use(new ListingDetailsPage(page));
  }
});

export { expect };
