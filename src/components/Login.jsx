import React, { useState } from "react";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import pic from "../assets/note.png";
import { validEmail } from "./Utlies/Helper";
import { BaseUrl } from "../Axios";
import {
  signInFailure,
  signInstarts,
  signInSuccess,
} from "../redux/Slice/userSlice";

export default function Login() {
  /* -------------------- HOOKS -------------------- */
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  /* -------------------- STATE -------------------- */
  const [inputSignup, setInputSignup] = useState({
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

  console.log(inputSignup);

  /* -------------------- LOGIN -------------------- */
  async function HandleLogin(e) {
    e.preventDefault();

    if (!inputSignup.Email || !inputSignup.Password) {
      toast.error("Please enter the details");
      return;
    }

    if (!validEmail(inputSignup.Email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      dispatch(signInstarts());

      const result = await BaseUrl.post(
        "/login",
        {
          Email: inputSignup.Email,
          Password: inputSignup.Password,
        },
        { withCredentials: true },
      );

      if (!result.data.success) {
        toast.error(result?.data?.message || "Something went wrong");
        dispatch(signInFailure(result.data.message));
        return;
      }

      dispatch(signInSuccess(result.data.user));
      console.log(result.data.token);

      localStorage.setItem("token", result.data.token);
      toast.success(result?.data?.message || "Something went wrong");

      Navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      dispatch(signInFailure(error.message));
    }
  }

  /* -------------------- GO TO SIGNUP -------------------- */
  async function HandleClick(e) {
    e.preventDefault();
    Navigate("/signup");
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="w-screen h-screen flex md:justify-center md:items-center">
      <div className="md:flex items-center w-full md:w-[80%] justify-center md:justify-evenly gap-x-6">
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
            <h1 className="font-bold text-5xl">Write your journey</h1>
          </div>

          <h1 className="mb-4 text-3xl mx-2 font-bold">with Noteflow</h1>

          <form className="flex flex-col w-[60%] justify-center">
            {/* EMAIL */}
            <input
              className="outline-blue-500 border border-gray-400 px-2 py-1 rounded-full my-1"
              type="text"
              placeholder="email"
              value={inputSignup.Email}
              onChange={HandleChange}
              name="Email"
            />

            {/* PASSWORD */}
            <input
              className="outline-blue-500 border border-gray-400 px-2 py-1 rounded-full my-1"
              type="password"
              placeholder="Password"
              name="Password"
              value={inputSignup.Password}
              onChange={HandleChange}
            />

            {/* LOGIN BUTTON */}
            <button
              onClick={HandleLogin}
              className="bg-blue-600 border-none py-2 rounded-full my-4 cursor-pointer text-lg text-white hover:bg-blue-700"
            >
              Log in
            </button>

            {/* EXTRA ACTIONS */}
            <div className="flex flex-col items-center justify-center">
              <a className="text-sm hover:underline decoration-blue-800 cursor-pointer text-gray-700">
                Forget password?
              </a>

              <span>or</span>

              <button
                onClick={HandleClick}
                className="bg-whit border border-blue-500 rounded-full py-2 px-10 md:px-16 cursor-pointer hover:bg-gray-300 my-1"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
