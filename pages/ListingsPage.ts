import { Page, Locator } from '@playwright/test';

export class ListingsPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly searchButton: Locator;

  readonly listingCards: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator(
      'input[name="q"], input[placeholder*="Search" i]'
    );

    this.searchButton = page.getByRole('button', {
      name: /search/i
    });

    this.listingCards = page.locator(
      '.listing-card, .card'
    );
  }

  async goto() {
    await this.page.goto('/listings');
  }

  async search(query: string) {
    await this.searchInput.fill(query);

    await this.searchButton.click();
  }

  async filterByCategory(category: string) {
    await this.page.goto(`/listings?category=${category}`);
  }

  async openListing(title: string) {
    await this.page.getByText(title, {
      exact: true
    }).click();
  }
}
