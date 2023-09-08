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

describe("Testing Create and List Request Functionality -> 312 App", () => {
  test("(5 pts) Create a feedback request and see if it appears on the list request page", async () => {
    let iname = makeRandomString(5);
    let isdesc = makeRandomString(15);
    let ilongdesc = makeRandomString(25);
    let iemailId = randomPoolOfEmailIds[Math.floor(Math.random() * 5)];

    // Navigate to the Feedback page
    await page.click("text=Feedback");

    // Navigate to the List requests page
    await page.click("text=List requests");

    // Use Playwright to assert the initial state of the table
    const tableBody = await page.locator("#main-table-body");
    const initialRowCount = await tableBody.locator("tr").count();
    const initialCellCount = await tableBody
      .locator("tr:first-child td")
      .count();

    expect(initialRowCount).toBe(3);
    expect(initialCellCount).toBe(6);

    const tableText = await tableBody.textContent();
    expect(tableText).toContain("Chris");
    expect(tableText).toContain("Saurav");
    expect(tableText).toContain("Feature");

    await createServiceRequestLive(page, iname, isdesc, ilongdesc, iemailId);

    await page.click("text=List requests");
    const updatedRowCount = await tableBody.locator("tr").count();

    let lastRow = await page
      .locator("#main-table-body tr:last-child")
      .textContent();

    expect(updatedRowCount).toBe(4);
    expect(lastRow).toContain(iname);
    expect(lastRow).toContain(isdesc);
    expect(lastRow).toContain(ilongdesc);
    expect(lastRow).toContain(iemailId);

    lastRow = await page.locator("#main-table-body tr:last-child");

    const isFirstCellButton =
      (await lastRow.locator("td:first-child button").count()) > 0;
    const isLastCellButton =
      (await lastRow.locator("td:last-child button").count()) > 0;

    expect(isFirstCellButton).toBe(true);
    expect(isLastCellButton).toBe(true);
  });

  test("(5 pts) Create a feedback request and see if it appears on the list request page and click the reset button", async () => {
    const iname = "Some Name";
    const isdesc = "Short Desc";
    const ilongdesc = "Long Desc";
    const iemailId = "email@email.com";

    await page.click("text=Add request");

    const isFormEmpty =
      (await page.$eval("#name", (el) => el.value)) === "" &&
      (await page.$eval("#sdescription", (el) => el.value)) === "" &&
      (await page.$eval("#emailId", (el) => el.value)) === "" &&
      (await page.$eval("#ldescription", (el) => el.value)) === "";

    expect(isFormEmpty).toBe(true);

    await page.fill("#name", iname);
    await page.fill("#sdescription", isdesc);
    await page.fill("#emailId", iemailId);
    await page.fill("#ldescription", ilongdesc);

    const isFormFilled =
      (await page.$eval("#name", (el) => el.value)).includes(iname) &&
      (await page.$eval("#sdescription", (el) => el.value)).includes(isdesc) &&
      (await page.$eval("#ldescription", (el) => el.value)).includes(
        ilongdesc
      ) &&
      (await page.$eval("#emailId", (el) => el.value)).includes(iemailId);

    expect(isFormFilled).toBe(true);

    await page.click("text=Reset Form");

    const isFormReset =
      (await page.$eval("#name", (el) => el.value)) === "" &&
      (await page.$eval("#sdescription", (el) => el.value)) === "" &&
      (await page.$eval("#emailId", (el) => el.value)) === "" &&
      (await page.$eval("#ldescription", (el) => el.value)) === "";

    expect(isFormReset).toBe(true);
  });
});
