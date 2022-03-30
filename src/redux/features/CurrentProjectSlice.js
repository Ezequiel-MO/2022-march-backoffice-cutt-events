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
    ADD_DAYS_TO_PROJECT_SCHEDULE: (state, action) => {
      return {
        ...state,
        project: {
          ...state.project,
          schedule: action.payload,
        },
      };
    },
    ADD_EVENT_TO_PROJECT: (state, action) => {
      const { dayOfEvent, timeOfEvent, eventId } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          schedule: state.project.schedule.map((day, index) => {
            if (index === dayOfEvent - 1) {
              return {
                ...day,
                [timeOfEvent]: [...day.morningEvents, eventId],
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
  ADD_DAYS_TO_PROJECT_SCHEDULE,
  ADD_EVENT_TO_PROJECT,
} = currentProjectSlice.actions;

export const selectCurrentProject = (state) => state.currentProject.project;

export default currentProjectSlice.reducer;
