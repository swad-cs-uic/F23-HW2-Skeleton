import React from "react";
import { expect, test, beforeEach, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

describe("Check the functionality of React GPT-484", () => {
  test("1. Create a new prompt, and it should appear in the history.", async () => {
    // Find the input field and enter a value
    const inputField = document.getElementById("inputField");
    fireEvent.change(inputField, { target: { value: "New Prompt 1" } });

    // Find and click the submit button
    await userEvent.click(document.getElementById("submit"));

    // Find the specific history list by its class or id
    const historyList = screen.getByRole("history-pane"); // Replace with the correct class or id

    // Get all the list items present under history
    const listItems = historyList.querySelectorAll("li");

    // Check whether there is a list item with value == "New Prompt 1" present in the history section
    const foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt 1"
    );

    //   console.log(foundItem);
    expect(foundItem).not.toBeUndefined(); // Check if foundItem is not null
  });

  test("2. Create a new prompt, and it should appear in the history. Creation of a new prompt under same parent, should not create a new entry in history section.", async () => {
    let inputField = document.getElementById("inputField");
    fireEvent.change(inputField, { target: { value: "New Prompt 1" } });
    await userEvent.click(document.getElementById("submit"));
    let historyList = screen.getByRole("history-pane");
    let listItems = historyList.querySelectorAll("li");
    let foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt 1"
    );

    expect(foundItem).not.toBeUndefined();

    inputField = document.getElementById("inputField");
    fireEvent.change(inputField, {
      target: { value: "New Prompt inside same parent" },
    });

    await userEvent.click(document.getElementById("submit"));
    historyList = screen.getByRole("history-pane");
    listItems = historyList.querySelectorAll("li");
    foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt inside same parent"
    );

    expect(foundItem).toBeUndefined();
  });

  test("3. Checking chats under same parent in viewing pane", async () => {
    let inputField = document.getElementById("inputField");
    fireEvent.change(inputField, { target: { value: "New Prompt 1" } });
    await userEvent.click(document.getElementById("submit"));
    let historyList = screen.getByRole("history-pane");
    let listItems = historyList.querySelectorAll("li");
    let foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt 1"
    );

    expect(foundItem).not.toBeUndefined();

    inputField = document.getElementById("inputField");
    fireEvent.change(inputField, {
      target: { value: "New Prompt inside same parent" },
    });
    await userEvent.click(document.getElementById("submit"));
    historyList = screen.getByRole("history-pane");
    listItems = historyList.querySelectorAll("li");
    foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt inside same parent"
    );
    expect(foundItem).toBeUndefined();

    let viewList = screen.getByRole("view-pane");
    listItems = viewList.querySelectorAll("li");
    expect(Array.from(listItems).length).equals(4);

    foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "User:New Prompt inside same parent"
    );

    expect(foundItem).not.toBeUndefined();
  });

  test("4. Clicking New Chat button and creating a new prompt should add an entry in history", async () => {
    let inputField = document.getElementById("inputField");
    fireEvent.change(inputField, { target: { value: "New Prompt 1" } });
    await userEvent.click(document.getElementById("submit"));
    let historyList = screen.getByRole("history-pane");
    let listItems = historyList.querySelectorAll("li");
    let foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt 1"
    );

    expect(foundItem).not.toBeUndefined();

    inputField = document.getElementById("inputField");
    fireEvent.change(inputField, {
      target: { value: "New Prompt inside same parent" },
    });
    await userEvent.click(document.getElementById("submit"));
    historyList = screen.getByRole("history-pane");
    listItems = historyList.querySelectorAll("li");
    foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt inside same parent"
    );

    expect(foundItem).toBeUndefined();

    await userEvent.click(document.getElementById("newChat"));
    inputField = document.getElementById("inputField");
    fireEvent.change(inputField, { target: { value: "New Prompt 2" } });
    await userEvent.click(document.getElementById("submit"));
    historyList = screen.getByRole("history-pane");
    listItems = historyList.querySelectorAll("li");

    // Check if the new prompt was added in the history section.
    expect(Array.from(listItems).length).toBeGreaterThan(1);
    foundItem = Array.from(listItems).find(
      (item) => item.textContent.trim() === "New Prompt 2"
    );

    expect(foundItem).not.toBeUndefined();
  });
});
