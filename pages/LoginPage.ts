import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly testAccountButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testAccountButton = page.locator("a[id='register-btn']");
    this.loginButton = page.locator("a[id='login-btn']");
  }

  async login() {
    await this.testAccountButton.click();
    await this.page.waitForTimeout(2000);
    await this.loginButton.click();
    await this.page.waitForTimeout(2000);
  }
}
