import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function makeRandomString(lengthOfString) {
  var randomString = "";
  var charactersString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = charactersString.length;
  let i;
  for (i = 0; i < lengthOfString; i++) {
    randomString += charactersString.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }
  return randomString;
}

const randomPoolOfEmailIds = [
  "a@g.com",
  "b@g.com",
  "c@g.com",
  "d@m.com",
  "t@s.com",
];

async function createServiceRequest(iname, isdesc, ilongdesc, iemailId) {
  // await userEvent.click(screen.getByText("Home"));
  // Check if on landing screen
  // expect(screen.getByText("Welcome to our awesome 311 app.")).toBeDefined();

  // goto the list request and check if the default list is there
  await userEvent.click(screen.getByText("List requests"));

  // Click on the list requests button and go to the create service / add service
  await userEvent.click(screen.getByText("Add request"));

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

  await userEvent.click(screen.getByText("Create Request"));
}

async function createServiceRequestLive(
  page,
  iname,
  isdesc,
  ilongdesc,
  iemailId,
) {
  // Navigate to the "List requests" page
  await page.click("text=List requests");

  // Click on the "Add request" button to go to the create service / add service page
  await page.click("text=Add request");

  // Fill in the input fields with the provided values
  await page.fill("#name", iname);
  await page.fill("#sdescription", isdesc);
  await page.fill("#emailId", iemailId);
  await page.fill("#ldescription", ilongdesc);

  // Click the "Create Request" button
  await page.click("text=Create Request");

  // Wait for the request creation to complete or navigate to the next page if needed
  // You may need to add appropriate waits or checks depending on your application's behavior
  // For example, you can wait for a confirmation message or a page transition.
  // await page.waitForSelector("text=Request created successfully"); // Replace with the actual confirmation message

  // You can also return any relevant data or confirmations if needed
  // For example, you can return a confirmation message or a unique identifier for the created request.
  // return page.textContent(".confirmation-message"); // Replace with the actual confirmation message selector
}
export {
  makeRandomString,
  randomPoolOfEmailIds,
  createServiceRequest,
  createServiceRequestLive,
};
