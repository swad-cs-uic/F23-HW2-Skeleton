# Homework2 - React GPT-484

## Installing required packages

Open the terminal window and type in `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed. `npm run dev` will run a local development server and open a web browser window for you that's pointed at your application.

## Skeleton code

The skeleton code of the application is designed to foster your knowledge on state management and reactivity. You start by utilizing an existing component that is almost 80% complete. You just need to complete the functionality as described in the TODOs. Once this is done the other component without any TODOs, allows you to apply your skills in making this component functional as per requirements.

## Navigating and starting project

Before running the project please make sure that you have installed all the dependencies mentioned in the step `Installing required packages`. Start the project by typing `npm run dev` in the terminal and open the URL in a browser.

When you browse the link, it should take you to the `Home` Page. Explore the app by navigating to the various tabs to get a understanding about the features of the application.

To start navigating through the project start with the `index.html` page and then follow the path to check how components are used. The main component used in this app is `App` (you can find the code for this in `App.jsx`). Checkout the `Routes` in this file and the other components used. All the other components are written in `/components` folder. The `scss` folder contains the styling import for bootstrap. `initial-data.json` contains the data about initial feedback requests. You will use this file to list feedback request whenever you start the applications OR when the user reloads the page.

Note - Please do not override the `initial-data.json` data with some additional feedback requests you will create on the web application. This file should be treated as a read-only file.

## Deliverables

Your code must function identically to the fully functional application.

- For the landing component there are TODOs and expected behavious well commented for your reference.
- For the feedback component, there are no TODO lines in the code - part of the challenge of this assignment is choosing where and how to save state in your application.

Deliverables -

1. The homepage shows a static GPT-484 powered by React. You should be able to create a new prompt, see a title generated in the left side of the screen and obtain a randomly generated response for your input. Any successive prompt inputs should get added under the same title and not create a new title.

2. Once you click on the New Chat button, and enter a new prompt and click the submit button, you shoudl see a new title generated in addition to the earlier title. Any new conversations should be placed inside this title.

3. List Requests Tab should list the feedback requests. When a complete button is pressed the request's text ( name, email, long and short descriptions, etc ) should be striken through (e.g. ~~text~~) to indicate that the request is complete.
   When a request is cancelled, it should be deleted and should be removed from the feedback request list.
   When is page is loaded / reloaded, the default requests inside the `initial-data.json` should be displayed (i.e. the initial state given by `initial-data.json` should be restored). For example, when a user first loads the page the requests from initial-data.json should be displayed . Now if the user cancels a request, this request is deleted from the feedback request but if the user reloads the page, all
   the requests from the initial-data.json should be again displayed. This action only happens when a user reloads/loads the page. In case the user doesn't reload the page and switches tabs then the current state of the feedback requests should be displayed.

- Please append the new request to the existing state (new requests added will be displayed below the previous requests).

3. Add Requests tab contains a form to create feedback request. Please complete the functions for buttons `Create Request` and `Reset Form`. `Create Request` button should create a request and update the state ( feedback Requests ). After creating the feedback request, this feedback request should be displayed when you switch to the `List requests` tab ( without page reload ). `Reset form` button should clear the contents of the form.

## Testing your code

The in-depth test cases are released with the assignment for your reference. You can do npm run test to see your progess and debug.
As with other assignments, any reasonable-quality test cases that you provide to the class (integration or unit, take your pick) will be eligible for extra credit.

**IMPORTANT**: Test cases are not a list of TODOs. Many students had difficulty getting started on the previous assignment because they took the grading criteria / test cases as an ordered list of TODOs. Please take stock of the full application and requirements before you start writing your code; it will probably be worth your time to stand in front of a whiteboard and build an understanding of the application structure before choosing where to add what.

## Deploying your website over Netlify.

1.  Click Use this template to create your own **PRIVATE** repository. (You must create a Private Repository for academic integrity)
2.  Clone this / Set up your created Repository, on your local.
3.  Make changes to the code base as per the homework requirements.
4.  Commit and push your changes to your repo.
5.  Open Netlify and connect your GitHub repository and you're all set.

## Points

| Task                                                                                     | Points |
| ---------------------------------------------------------------------------------------- | ------ |
| List Requests - Complete the functionality of GPT-484                                    | 10     |
| List Requests - Complete and Cancel Functions along with displaying of feedback requests | 10     |
| Add Request - Create and Reset functions properly implemented                            | 10     |
| Testing all of the above test cases over live website                                    | 30     |
| CI Tests (Lint, Format, Typecheck)                                                       | 3      |

## Due date

This assignment is due on Friday, September 29th, at 3:00PM. You are highly encouraged to get started early.
