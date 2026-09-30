import { Page, Locator } from '@playwright/test';

export class ListingDetailsPage {
  readonly page: Page;

  readonly title: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly location: Locator;
  readonly country: Locator;

  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('h1, h2, h3').first();

    this.description = page.locator(
      'p'
    ).first();

    this.price = page.getByText(/₹|\/night|price/i).first();

    this.location = page.getByText(
      /location/i
    ).first();

    this.country = page.getByText(
      /country/i
    ).first();

    this.editButton = page.getByRole('link', {
      name: /edit/i
    });

    this.deleteButton = page.getByRole('button', {
      name: /delete/i
    });
  }

  async goto(id: string) {
    await this.page.goto(`/listings/${id}`);
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async deleteListing() {
    await this.deleteButton.click();
  }
}
