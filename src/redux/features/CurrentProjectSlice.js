import { createSlice } from "@reduxjs/toolkit";

//set initial state.project to 'currentProject' from localStorage
const initialState = {
  project: JSON.parse(localStorage.getItem("currentProject")),
};

export const currentProjectSlice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    SET_CURRENT_PROJECT: (state, action) => {
      state.project = action.payload;
    },
    ADD_HOTEL_TO_PROJECT: (state, action) => {
      return {
        ...state,
        project: {
          ...state.project,
          hotels: [...state.project.hotels, action.payload],
        },
      };
    },
  },
});

export const { SET_CURRENT_PROJECT, ADD_HOTEL_TO_PROJECT } =
  currentProjectSlice.actions;

export const selectCurrentProject = (state) => state.currentProject.project;

export default currentProjectSlice.reducer;
