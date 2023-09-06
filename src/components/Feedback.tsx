import Nav from "./Navbar";
import { Routes, Route } from "react-router-dom";
import { AddRequestForm } from "./FeedbackRequest";
import { RequestList } from "./FeedbackRequest";

function FeedbackScreen() {
  // There maybe a need of defining state and passing them as props to components for enabling state sharing across components.
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/list" element={<RequestList />} />

        <Route path="/add" element={<AddRequestForm />} />
      </Routes>
    </>
  );
}

export default FeedbackScreen;
