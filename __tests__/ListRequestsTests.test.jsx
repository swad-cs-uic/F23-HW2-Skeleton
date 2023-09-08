// Imports
import { beforeEach, describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
  makeRandomString,
  randomPoolOfEmailIds,
  createServiceRequest,
} from "./testUtils";

// To be called after every test to reset the Render of App Component
beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

// Test cases to check functionality of complete and cancel buttons
describe("Testing List Request Complete Cancel Functions -> 312 App", () => {
  // Reversing the order of test cases to accomodate for rendering side effects for some submissions
  test("(2 pts) Create feedback Request and Cancel it - Cancel and check if the request disappears from table", async () => {
    await userEvent.click(screen.getByText("Feedback"));
    await userEvent.click(screen.getByText("List requests"));
    expect(document.getElementById("main-table-body").rows.length).toBe(3);
    let cancelButtons = await screen.findAllByLabelText("cancel");
    fireEvent.click(cancelButtons[cancelButtons.length - 1]);

    expect(document.getElementById("main-table-body").rows.length).toBe(2);
    // Check if the last row represented in the initial-data.json is not present
    expect(
      document
        .getElementById("main-table-body")
        .innerHTML.includes("new@feature.com") &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes("May be we can add recommendations?") &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes("Feature") &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes("Feature Request")
    ).toBe(false);
  });

  test("(4 pts) Create feedback Request and Complete it - Complete Request and Check CSS", async () => {
    let iname = makeRandomString(5);
    let isdesc = makeRandomString(15);
    let ilongdesc = makeRandomString(25);
    let iemailId = randomPoolOfEmailIds[Math.floor(Math.random() * 5)];

    await createServiceRequest(iname, isdesc, ilongdesc, iemailId);

    await userEvent.click(screen.getByText("List requests"));

    // Check if the request got created
    // Get the length of rows
    let tableDOM = document.getElementById("main-table-body");
    const tableLength = tableDOM.rows.length;

    expect(
      tableDOM.rows[tableLength - 1].innerHTML.includes(iname) &&
        tableDOM.rows[tableLength - 1].innerHTML.includes(isdesc) &&
        tableDOM.rows[tableLength - 1].innerHTML.includes(ilongdesc) &&
        tableDOM.rows[tableLength - 1].innerHTML.includes(iemailId)
    );

    // Goto feedback request page
    await userEvent.click(screen.getByText("List requests"));

    // Complete the feedback request
    let completeButtons = await screen.findAllByLabelText("complete");
    fireEvent.click(completeButtons[completeButtons.length - 1]);

    // Check if this feedback request got completed by checking the css
    let trRows = document.getElementById("main-table-body").rows.length;
    expect(
      document
        .getElementById("main-table-body")
        .rows[trRows - 1].outerHTML.includes(
          `style="text-decoration: line-through;"`
        )
    ).toBe(true);
  });

  test("(4 pts) Create feedback Request and Cancel it - Random Service", async () => {
    // Create a random text feedback request
    let rname = makeRandomString(5);
    let rsdesc = makeRandomString(20);
    let rlongdesc = makeRandomString(40);
    let remailId = randomPoolOfEmailIds[Math.floor(Math.random() * 5)];
    await createServiceRequest(rname, rsdesc, rlongdesc, remailId);

    // Go to the List request page
    await userEvent.click(screen.getByText("List requests"));

    // Before Cancel Click
    expect(
      document.getElementById("main-table-body").innerHTML.includes(rname) &&
        document.getElementById("main-table-body").innerHTML.includes(rsdesc) &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes(rlongdesc) &&
        document.getElementById("main-table-body").innerHTML.includes(remailId)
    ).toBe(true);

    let cancelButtons = await screen.findAllByLabelText("cancel");
    fireEvent.click(cancelButtons[cancelButtons.length - 1]);

    // After Cancel Click
    // Check that the text doesn't appear on the page
    expect(
      document.getElementById("main-table-body").innerHTML.includes(rname) &&
        document.getElementById("main-table-body").innerHTML.includes(rsdesc) &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes(rlongdesc) &&
        document.getElementById("main-table-body").innerHTML.includes(remailId)
    ).toBe(false);
  });
});
