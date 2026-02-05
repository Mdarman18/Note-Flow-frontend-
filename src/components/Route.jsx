import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

const Body = () => {
  const Route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={Route} />
    </div>
  );
};

export default Body;
