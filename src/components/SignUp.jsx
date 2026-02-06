import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import pic from "../assets/notes.png";
import { BaseUrl } from "../Axios";
import { validEmail } from "./Utlies/Helper";
import {
  signInFailure,
  signInstarts,
  signInSuccess,
} from "../redux/Slice/userSlice";

export default function SignUp() {
  /* -------------------- HOOKS -------------------- */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* -------------------- STATE -------------------- */
  const [inputSignup, setInputSignup] = useState({
    Name: "",
    Username: "",
    Email: "",
    Password: "",
  });

  /* -------------------- INPUT CHANGE -------------------- */
  function HandleChange(e) {
    const { name, value } = e.target;
    setInputSignup({
      ...inputSignup,
      [name]: value,
    });
  }

  /* -------------------- SIGN UP -------------------- */
  async function HandleLogin(e) {
    e.preventDefault();

    if (
      !inputSignup.Email ||
      !inputSignup.Password ||
      !inputSignup.Username ||
      !inputSignup.Name
    ) {
      toast.error("Please enter the detalis");
      return;
    }

    if (!validEmail(inputSignup.Email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      dispatch(signInstarts());

      const result = await BaseUrl.post("/signup", inputSignup);

      if (!result.data.success) {
        toast.error(result?.data?.message || "Something went wrong");
        dispatch(signInFailure(result.data.message));
        return;
      }

      dispatch(signInSuccess(result.data.user));
      toast.success(result.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  /* -------------------- GO TO LOGIN -------------------- */
  function HandleClick(e) {
    e.preventDefault();
    navigate("/login");
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="md:flex items-center w-[80%] justify-center md:justify-evenly gap-x-6">
        {/* IMAGE */}
        <div>
          <img
            className="ml-8 object-fit rounded-full h-50 w-50 md:h-80 md:w-80 drop-shadow-2xl"
            src={pic}
            alt="logo"
          />
        </div>

        {/* FORM */}
        <div>
          <div className="my-3">
            <h1 className="font-bold text-5xl">Get started...</h1>
          </div>

          <h1 className="mb-4 text-3xl mx-2 font-bold">with Noteflow</h1>

          <form className="flex flex-col w-[90%] justify-center">
            <input
              className="outline-blue-500 border border-gray-400 px-2 py-1 text-center rounded-full my-1"
              type="text"
              placeholder="enter your name"
              value={inputSignup.Name}
              onChange={HandleChange}
              name="Name"
            />

            <input
              className="outline-blue-500 border border-gray-400 px-2 py-1 text-center rounded-full my-1"
              placeholder="enter your username"
              name="Username"
              value={inputSignup.Username}
              onChange={HandleChange}
            />

            <input
              className="outline-blue-500 border border-gray-400 px-2 py-1 text-center rounded-full my-1"
              type="text"
              placeholder="enter your email"
              value={inputSignup.Email}
              onChange={HandleChange}
              name="Email"
            />

            <input
              className="outline-blue-500 border border-gray-400 px-2 py-1 text-center rounded-full my-1"
              type="password"
              placeholder="Password"
              name="Password"
              value={inputSignup.Password}
              onChange={HandleChange}
            />

            <button
              onClick={HandleLogin}
              className="bg-blue-600 border-none py-2 rounded-full my-4 cursor-pointer text-lg text-white hover:bg-blue-700"
            >
              sign up
            </button>

            <div className="flex flex-col items-center justify-center">
              <span>or</span>
              <button
                onClick={HandleClick}
                className="bg-whit border border-blue-500 rounded-full py-2 px-6 my-1 cursor-pointer hover:bg-gray-300"
              >
                I already have an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
