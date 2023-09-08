import { chromium } from "playwright";
import { expect, beforeAll, afterAll, test, describe } from "vitest";
import { website } from "../student.json";
let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto(website);
  // page.on("console", (message) => {
  //   console.log(`Console [${message.type()}]: ${message.text()}`);
  // });
}, 60000);

afterAll(async () => {
  await browser.close();
});

describe("Check the functionality of React GPT-484", () => {
  test("1. Create a new prompt, and it should appear in the history.", async () => {
    // Navigate to the page or ensure you are on the correct page

    // Find the input field and enter a value
    const inputField = await page.$("#inputField");
    await inputField.type("New Prompt 1");

    // Find and click the submit button
    const submitButton = await page.$("#submit");
    await submitButton.click();

    // Find the specific history list by its role attribute (if available)
    const historyList = await page.$('[role="history-pane"]'); // Replace with the correct role attribute

    // Get all the list items present under history
    const listItems = await historyList.$$eval("li", (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    // Check whether there is an item with value == "New Prompt 1" present in the history section
    const isItemFound = listItems.includes("New Prompt 1");

    expect(isItemFound).toBe(true);
  });

  test("2. Create a new prompt, and it should appear in the history. Creation of a new prompt under the same parent should not create a new entry in the history section.", async () => {
    // Navigate to the page or ensure you are on the correct page

    // Find the input field and enter the first prompt
    const inputField = await page.$("#inputField");

    // Find and click the submit button
    const submitButton = await page.$("#submit");

    // Find the specific history list by its role attribute (if available)
    const historyList = await page.$('[role="history-pane"]'); // Replace with the correct role attribute

    // Clear the input field
    await inputField.fill("");

    // Enter a new prompt under the same parent
    await inputField.type("New Prompt inside same parent");

    // Click the submit button again
    await submitButton.click();

    // Get the updated list items after adding the second prompt
    const updatedListItems = await historyList.$$eval("li", (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    // Check whether the second prompt is not present in the history section
    const isSecondItemFound = updatedListItems.includes(
      "New Prompt inside same parent"
    );
    expect(isSecondItemFound).toBe(false);
  });

  test("3. Checking chats under the same parent in the viewing pane", async () => {
    // Find the specific viewing list by its role attribute (if available)
    const viewList = await page.$('[role="view-pane"]'); // Replace with the correct role attribute

    // Get all the list items present under the viewing section
    const viewListItems = await viewList.$$eval("li", (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    // Check the length of the viewing list
    expect(viewListItems.length).toBe(4);

    // Check whether the "User:New Prompt inside same parent" is present in the viewing section
    const isViewItemFound = viewListItems.includes(
      "User:New Prompt inside same parent"
    );
    expect(isViewItemFound).toBe(true);
  });

  test("4. Clicking New Chat button and creating a new prompt should add an entry in history", async () => {
    // Navigate to the page or ensure you are on the correct page

    // Find the input field and enter the first prompt
    const inputField = await page.$("#inputField");

    // Find and click the submit button
    const submitButton = await page.$("#submit");

    // Find the specific history list by its role attribute (if available)
    const historyList = await page.$('[role="history-pane"]'); // Replace with the correct role attribute

    // Find and click the "New Chat" button
    const newChatButton = await page.$("#newChat");
    await newChatButton.click();

    // Find the input field and enter the third prompt
    await inputField.fill("New Prompt 2");

    // Click the submit button again
    await submitButton.click();

    // Get the updated list items after adding the third prompt
    const finalListItems = await historyList.$$eval("li", (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    // Check if the new prompt was added in the history section
    expect(finalListItems.length).toBeGreaterThan(1);
    const isNewPromptAdded = finalListItems.includes("New Prompt 2");
    expect(isNewPromptAdded).toBe(true);
  });
});
