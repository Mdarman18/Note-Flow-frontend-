import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  currentUser: null,
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
      state.currentUser = action.payload;
      state.loading = false;
      state.errorDisptach = null;
    },
    signInFailure: (state, action) => {
      state.errorDisptach = action.payload;
      state.loading = false;
    },
    signOutstarts: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.errorDisptach = null;
    },
    signOutFailure: (state, action) => {
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
