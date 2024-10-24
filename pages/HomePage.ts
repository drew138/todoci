import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly getStartedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedButton = page.locator(
      "div > a[class='btn waves-effect waves-light red']",
    );
  }

  async navigate() {
    await this.page.goto("http://localhost:5000");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async goToLogin() {
    await this.getStartedButton.click();
  }
}
