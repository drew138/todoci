import { test, expect } from "@playwright/test";
import * as testData from "../data/todo_data.json";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ToDoPage } from "../pages/ToDoPage";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.goToLogin();
  const loginPage = new LoginPage(page);
  await loginPage.login();
});

test("should add an item correctly", async ({ page }) => {
  const toDoPage = new ToDoPage(page);

  toDoPage.addItem(testData.itemName);

  expect(await toDoPage.getItem(testData.itemName)).toContainText(
    testData.itemName,
  );
  await page.screenshot({ path: `add_item.png` });
});

test("should toggle an item correctly", async ({ page }) => {
  const toDoPage = new ToDoPage(page);

  toDoPage.addItem(testData.itemName);
  toDoPage.toggleCheckBox(testData.itemName);

  const item = await toDoPage.getItem(testData.itemName);
  const inactiveItem = item.locator(".inactive-item");
  await inactiveItem.waitFor({ state: "visible" });
  expect(inactiveItem).toBeVisible();
  await page.screenshot({ path: `check_item.png` });
});

test("should clear checked items correctly", async ({ page }) => {
  const toDoPage = new ToDoPage(page);

  toDoPage.addItem(testData.itemName);
  toDoPage.toggleCheckBox(testData.itemName);
  toDoPage.clearCheckedItems();
  const items = toDoPage.getItems();
  const count = await items.count();

  for (let i = 0; i < count; i++) {
    const spanText = items.nth(i).textContent();
    expect(spanText).not.toContain(testData.itemName);
  }

  await page.screenshot({ path: `clear_item.png` });
});
