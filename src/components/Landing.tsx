import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatMessage } from "../utils/types";

function Landing() {
  const [value, setValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [previousChats, setPreviousChats] = useState<Array<ChatMessage>>([]);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  // TODO:
  // This function is called on the click event of the  "New Chat" button.
  // Required Functionality:
  // Reset every state to default.
  const createNewChat = () => {
    // Write code here
  };

  // TODO:
  // This function is called when you click any title in the history-pane.
  // Required Functionality:
  // Set the currentTitle as uniqueTitle.
  // Reset the messsage and value state.
  const handleClick = (uniqueTitle: SetStateAction<string | null>) => {
    // Write code here
  };

  // Function to generate a random sentence
  const generateRandomSentence = () => {
    const subjects = ["The cat", "A dog", "My friend", "The weather"];
    const verbs = ["jumps", "barks at", "loves", "hates"];
    const objects = ["the moon", "the park", "chocolate", "rainy days"];

    const getRandomElement = (array: string | unknown[]) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };

    const subject = getRandomElement(subjects);
    const verb = getRandomElement(verbs);
    const object = getRandomElement(objects);

    return `${subject} ${verb} ${object}.`;
  };

  // Function to generate random text of a specified length
  const getMessages = async () => {
    try {
      // TODO:
      // Task: Generate a random sentence
      // Call the function that generates a random sentence which return a value say "res"
      // Update the message state to this "res".
      // Write code here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      // TODO:
      // Task: Write logic to update the previousChats state.
      // On every update, you should include 2 new objects in the array. [Along with the earlier objects "..."]
      // The 1st object is responsible for User Input message.
      // The 2nd object is responsible for dislaying Bot's Output message.
      // The object should be of following type for the 1st object: {title: ABC, role: "User:", content: XYZ}
      // The object should be of following type for the 2nd object: {title: ABC, role: "Bot:", content: XYZ}
      // Replace ABC and XYZ with the associated titles and content for both User and Bot.
      // Write code here
    }
    // eslint-disable-next-line
  }, [message, currentTitle]);

  // TODO:
  // Get the currentChat from the array of all previousChats in "const currentChat".
  // The currentChat is defined as all the previousChats with title == currentTitle.

  // Write code here

  // TODO:
  // Get all the Array of "uniqueTitles".
  // The previousChat is an Array of <ChatMessage>. From this array fetch and create an array of all unique titles.
  // Set it to const uniqueTitle

  // Write code here

  return (
    <div className="app">
      <section className="side-bar">
        <button id="newChat" onClick={createNewChat}>
          +New Chat
        </button>
        <ul className="history" role="history-pane">
          {/* TODO:
          Complete the callback function.
          Create a list <li> with key = index and attach and onClick.
          The relevant function to be called onClick has already been created for you.
          Each list item should show a unique title with an eventListener attached to it.
          */}
          {uniqueTitles?.map((uniqueTitle, index) => (
            // Write code here
          ))}
        </ul>
        <nav>
          <p>Baked for CS484 💝</p>
          <button className="feedback">
            <Link to="/feedback">Feedback</Link>
          </button>
        </nav>
      </section>

      <section className="main">
        {!currentTitle && <h1> GPT-484</h1>}
        <ul className="feed" role="view-pane">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content} </p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              id="inputField"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            Fun to love GPT App for showing a Full-stack application. Allows to
            demo a 301 Full-stack Application.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
