import { Page, Locator } from "@playwright/test";

export class ToDoPage {
  readonly page: Page;
  readonly toDoInput: Locator;
  readonly toDoListItems: Locator;
  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toDoInput = page.locator("input[id='item-input']");
    this.toDoListItems = page.locator("span.item-body");
    this.clearButton = page.locator("#clear-btn");
  }

  async addItem(description: string) {
    await this.toDoInput.fill(description);
    await this.toDoInput.press("Enter");
    await this.getItem(description);
  }

  async toggleCheckBox(description: string) {
    const item = (await this.getItem(description)).locator("i");
    await item.waitFor({ state: "visible" });
    await item.click();
  }

  async clearCheckedItems() {
    await this.clearButton.click();
  }

  async getItem(description: string): Promise<Locator> {
    const item = this.toDoListItems.filter({ hasText: description });
    await item.waitFor({ state: "visible" });
    return item;
  }

  getItems(): Locator {
    return this.toDoListItems;
  }
}
