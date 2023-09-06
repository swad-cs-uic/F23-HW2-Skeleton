import "./App.css";
import FeedbackScreen from "./components/Feedback";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feedback/*" element={<FeedbackScreen />} />
      </Routes>
    </>
  );
};

export default App;
