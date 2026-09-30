import { Page, Locator } from '@playwright/test';

export class EditListingPage {
  readonly page: Page;

  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly priceInput: Locator;
  readonly countryInput: Locator;
  readonly locationInput: Locator;
  readonly categorySelect: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.locator(
      'input[name="listing[title]"]'
    );

    this.descriptionInput = page.locator(
      'textarea[name="listing[description]"]'
    );

    this.priceInput = page.locator(
      'input[name="listing[price]"]'
    );

    this.countryInput = page.locator(
      'input[name="listing[country]"]'
    );

    this.locationInput = page.locator(
      'input[name="listing[location]"]'
    );

    this.categorySelect = page.locator(
      'select[name="listing[category]"]'
    );

    this.updateButton = page.getByRole('button', {
      name: /update listing/i
    });
  }

  async updateListing(data: {
    title?: string;
    description?: string;
    price?: string;
    country?: string;
    location?: string;
    category?: string;
  }) {
    if (data.title) {
      await this.titleInput.fill(data.title);
    }

    if (data.description) {
      await this.descriptionInput.fill(
        data.description
      );
    }

    if (data.price) {
      await this.priceInput.fill(data.price);
    }

    if (data.country) {
      await this.countryInput.fill(data.country);
    }

    if (data.location) {
      await this.locationInput.fill(data.location);
    }

    if (data.category) {
      await this.categorySelect.selectOption(
        data.category
      );
    }

    await this.updateButton.click();
  }
}
