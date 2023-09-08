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

// Test Cases to test creating feedback request and form actions
describe("Testing Create and List Request Functionality -> 312 App", () => {
  test("(5 pts) Create a feedback request and see if appears on list request page", async () => {
    let iname = makeRandomString(5);
    let isdesc = makeRandomString(15);
    let ilongdesc = makeRandomString(25);
    let iemailId = randomPoolOfEmailIds[Math.floor(Math.random() * 5)];

    // Check Initially if the default feedback request are present
    await userEvent.click(screen.getByText("Feedback"));
    await userEvent.click(screen.getByText("List requests"));
    expect(document.getElementById("main-table-body").rows.length).toBe(3);
    expect(
      document.getElementById("main-table-body").rows[0].cells.length
    ).toBe(6);
    expect(
      document.getElementById("main-table-body").rows[1].cells.length
    ).toBe(6);
    expect(
      document.getElementById("main-table-body").rows[2].cells.length
    ).toBe(6);
    expect(
      document.getElementById("main-table-body").innerHTML.includes("Chris") &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes("Saurav") &&
        document.getElementById("main-table-body").innerHTML.includes("Feature")
    );

    await createServiceRequest(iname, isdesc, ilongdesc, iemailId);
    await userEvent.click(screen.getByText("List requests"));

    expect(document.getElementById("main-table-body").rows.length).toBe(4);
    expect(
      document.getElementById("main-table-body").rows[3].cells.length
    ).toBe(6);
    expect(
      document.getElementById("main-table-body").innerHTML.includes(iname) &&
        document.getElementById("main-table-body").innerHTML.includes(isdesc) &&
        document
          .getElementById("main-table-body")
          .innerHTML.includes(ilongdesc) &&
        document.getElementById("main-table-body").innerHTML.includes(iemailId)
    ).toBe(true);

    // Get the length of rows
    let tableDOM = document.getElementById("main-table-body");
    const tableLength = tableDOM.rows.length;

    // Check the last row and see if contains two buttons
    expect(
      tableDOM.rows[tableLength - 1].cells[0].innerHTML.includes("<button")
    ).toBe(true);
    expect(
      tableDOM.rows[tableLength - 1].cells[5].innerHTML.includes("<button")
    ).toBe(true);
  });

  test("(5 pts) Create a feedback request and see if appears on list request page and click reset button", async () => {
    let iname = "Some Name";
    let isdesc = "Short Desc";
    let ilongdesc = "Long Desc";
    let iemailId = "email@email.com";

    await userEvent.click(screen.getByText("Add request"));

    expect(
      document.getElementById("name").value == "" &&
        document.getElementById("sdescription").value == "" &&
        document.getElementById("emailId").value == "" &&
        document.getElementById("ldescription").value == ""
    ).toBe(true);

    // Click on the list requests button and go to the create service / add service

    const inputName = document.getElementById("name");
    await fireEvent.change(inputName, { target: { value: iname } });

    const inputShortDesc = document.getElementById("sdescription");
    await fireEvent.change(inputShortDesc, {
      target: { value: isdesc },
    });

    const inputEmail = document.getElementById("emailId");
    await fireEvent.change(inputEmail, {
      target: { value: iemailId },
    });

    const inputLongDesc = document.getElementById("ldescription");
    await fireEvent.change(inputLongDesc, {
      target: { value: ilongdesc },
    });

    expect(
      document.getElementById("name").value.includes(iname) &&
        document.getElementById("sdescription").value.includes(isdesc) &&
        document.getElementById("ldescription").value.includes(ilongdesc) &&
        document.getElementById("emailId").value.includes(iemailId)
    ).toBe(true);

    await userEvent.click(screen.getByText("Reset Form"));

    expect(
      document.getElementById("name").value == "" &&
        document.getElementById("sdescription").value == "" &&
        document.getElementById("emailId").value == "" &&
        document.getElementById("ldescription").value == ""
    ).toBe(true);
  });
});
