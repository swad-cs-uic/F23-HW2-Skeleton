import { chromium } from "playwright";
import { expect, beforeAll, afterAll, test, describe } from "vitest";
import {
  makeRandomString,
  randomPoolOfEmailIds,
  createServiceRequestLive,
} from "./testUtils";
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

describe("Testing List Request Complete Cancel Functions -> 312 App", () => {
  test("(2 pts) Create feedback Request and Cancel it - Cancel and check if the request disappears from table", async () => {
    // Simulate user clicks using Playwright
    await page.click("text=Feedback");
    await page.click("text=List requests");

    // Use Playwright to find the table body element
    const tableBody = await page.locator("#main-table-body");

    // Count the rows within the table body
    const rowCount = await tableBody.locator("tr").count();

    // Use Playwright's expect to make assertions
    expect(rowCount).toBe(3);

    // Find and click the cancel button
    const cancelButtons = await page.$$("button[aria-label='cancel']");
    expect(cancelButtons.length).toBe(3);
    await cancelButtons[cancelButtons.length - 1].click();

    const newRowCount = await tableBody.locator("tr").count();
    expect(newRowCount).toBe(2);

    // Check if the last row's content is not present
    const tableText = await tableBody.textContent();
    expect(tableText).not.toContain("new@feature.com");
    expect(tableText).not.toContain("May be we can add recommendations?");
    expect(tableText).not.toContain("Feature");
    expect(tableText).not.toContain("Feature Request");
  });

  test("(4 pts) Create feedback Request and Complete it - Complete Request and Check CSS", async () => {
    let iname = makeRandomString(5);
    let isdesc = makeRandomString(15);
    let ilongdesc = makeRandomString(25);
    let iemailId = randomPoolOfEmailIds[Math.floor(Math.random() * 5)];

    // Use Playwright to create a service request
    // Assuming you have functions for creating a request, replace with actual code
    await createServiceRequestLive(page, iname, isdesc, ilongdesc, iemailId);

    // Simulate user clicks using Playwright
    await page.click("text=List requests");
    //   console.log(await page.content());
    // Check if the request got created
    // Count the rows within the table body
    const tableBody = await page.locator("#main-table-body");
    const rowCount = await tableBody.locator("tr").count();

    // Use Playwright's expect to make assertions
    expect(rowCount).equals(3);
    const tableText = await tableBody.textContent();
    expect(tableText).toContain(iname);
    expect(tableText).toContain(isdesc);
    expect(tableText).toContain(ilongdesc);
    expect(tableText).toContain(iemailId);

    // Simulate user clicks to complete the feedback request
    const completeButtons = await page.$$("button[aria-label='complete']");
    await completeButtons[completeButtons.length - 1].click();
    // Check if this feedback request got completed by checking the CSS
    const lastTableRow = (await page.locator("#main-table-body tr")).last();
    const styleAttribute = await lastTableRow.getAttribute("style");

    // Use Playwright's expect to make assertions about the CSS
    expect(styleAttribute).toContain("text-decoration: line-through;");
  });

  test("(4 pts) Create feedback Request and Cancel it - Random Service", async () => {
    // Create random values for the feedback request
    let rname = makeRandomString(5);
    let rsdesc = makeRandomString(20);
    let rlongdesc = makeRandomString(40);
    let remailId = randomPoolOfEmailIds[Math.floor(Math.random() * 5)];

    // Use Playwright to create a service request
    await createServiceRequestLive(page, rname, rsdesc, rlongdesc, remailId);

    // Simulate user clicks using Playwright
    await page.click("text=List requests");

    // Check if the request data is present before cancel
    const tableBody = await page.locator("#main-table-body");
    const tableTextBeforeCancel = await tableBody.textContent();

    // Use Playwright's expect to make assertions before cancel
    expect(tableTextBeforeCancel).toContain(rname);
    expect(tableTextBeforeCancel).toContain(rsdesc);
    expect(tableTextBeforeCancel).toContain(rlongdesc);
    expect(tableTextBeforeCancel).toContain(remailId);

    // Find and click the cancel button
    const cancelButtons = await page.$$("[aria-label='cancel']");
    await cancelButtons[cancelButtons.length - 1].click();

    // Check if the request data is no longer present after cancel
    const tableTextAfterCancel = await tableBody.textContent();

    // Use Playwright's expect to make assertions after cancel
    expect(tableTextAfterCancel).not.toContain(rname);
    expect(tableTextAfterCancel).not.toContain(rsdesc);
    expect(tableTextAfterCancel).not.toContain(rlongdesc);
  });
});
