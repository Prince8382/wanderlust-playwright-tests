import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');

    this.emailInput = page.locator('input[name="email"]');

    this.passwordInput = page.locator('input[name="password"]');

    this.signupButton = page.getByRole('button', {
      name: /sign up|signup|register/i
    });
  }

  async goto() {
    await this.page.goto('/signup');
  }

  async signup(
    username: string,
    email: string,
    password: string
  ) {
    await this.usernameInput.fill(username);

    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.signupButton.click();
  }
}
