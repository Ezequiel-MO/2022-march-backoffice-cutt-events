import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: JSON.parse(localStorage.getItem("currentProject")) || {},
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
    ADD_EVENT_TO_SCHEDULE: (state, action) => {
      const { dayOfEvent, timeOfEvent, event } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          schedule: state.project.schedule.map((day, index) => {
            if (index === dayOfEvent) {
              return {
                ...day,
                [timeOfEvent]: [...day[timeOfEvent], event],
              };
            }
            return day;
          }),
        },
      };
    },
  },
});

export const {
  SET_CURRENT_PROJECT,
  ADD_HOTEL_TO_PROJECT,
  ADD_EVENT_TO_SCHEDULE,
} = currentProjectSlice.actions;

export const selectCurrentProject = (state) => state.currentProject.project;

export default currentProjectSlice.reducer;
