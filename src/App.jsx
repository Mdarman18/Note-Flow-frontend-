import React from "react";
import Body from "./components/Route";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="">
      <ToastContainer position="top-center" />
      <Body />
    </div>
  );
}

export default App;
