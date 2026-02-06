import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  currentUser: null,
  token: null,
  errorDisptach: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInstarts: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.errorDisptach = null;
      localStorage.setItem("token", action.payload.token);
    },
    signInFailure: (state, action) => {
      state.errorDisptach = action.payload;
      state.loading = false;
      state.token = null;
    },
    signOutstarts: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.errorDisptach = null;
      localStorage.removeItem("token");
    },
    signOutFailure: (state, action) => {
      state.currentUser = null;
      state.token = null;
      state.errorDisptach = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInstarts,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signOutstarts,
} = userSlice.actions;
export default userSlice.reducer;
