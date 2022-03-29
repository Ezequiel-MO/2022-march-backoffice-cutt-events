import { configureStore } from "@reduxjs/toolkit";
import currentProjectReducer from "./features/CurrentProjectSlice";

export default configureStore({
  reducer: {
    currentProject: currentProjectReducer,
  },
});
