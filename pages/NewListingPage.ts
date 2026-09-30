import { Page, Locator } from '@playwright/test';

export class NewListingPage {
  readonly page: Page;

  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly imageInput: Locator;
  readonly priceInput: Locator;
  readonly countryInput: Locator;
  readonly locationInput: Locator;
  readonly categorySelect: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.locator(
      'input[name="listing[title]"]'
    );

    this.descriptionInput = page.locator(
      'textarea[name="listing[description]"]'
    );

    this.imageInput = page.locator(
      'input[name="listing[image]"]'
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

    this.addButton = page.getByRole('button', {
      name: /^add$/i
    });
  }

  async goto() {
    await this.page.goto('/listings/new');
  }

  async fillListing(data: {
    title: string;
    description: string;
    price: string;
    country: string;
    location: string;
    category: string;
  }) {
    await this.titleInput.fill(data.title);

    await this.descriptionInput.fill(
      data.description
    );

    await this.priceInput.fill(data.price);

    await this.countryInput.fill(data.country);

    await this.locationInput.fill(data.location);

    await this.categorySelect.selectOption(
      data.category
    );
  }

  async uploadImage(filePath: string) {
    await this.imageInput.setInputFiles(filePath);
  }

  async createListing() {
    await this.addButton.click();
  }
}
