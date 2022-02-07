import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import data from "./data";

export default configureStore({
  devTools: true,
  reducer: {
    auth,
    data
  }
});
