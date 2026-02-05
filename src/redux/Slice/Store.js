import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🔹 Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// 🔹 Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// 🔹 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist ke liye
    }),
});

// 🔹 Persistor
export const persistor = persistStore(store);
