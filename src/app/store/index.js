import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";

export default configureStore({
  devTools: true,
  reducer: {
    auth
  }
});
