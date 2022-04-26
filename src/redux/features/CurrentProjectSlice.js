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
    REMOVE_HOTEL_FROM_PROJECT: (state, action) => {
      return {
        ...state,
        project: {
          ...state.project,
          hotels: state.project.hotels.filter(
            (hotel) => hotel._id !== action.payload
          ),
        },
      };
    },
    REMOVE_EVENT_FROM_SCHEDULE: (state, action) => {
      const { dayOfEvent, timeOfEvent, eventId } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          schedule: state.project.schedule.map((day, index) => {
            if (index === dayOfEvent) {
              return {
                ...day,
                [timeOfEvent]: day[timeOfEvent].filter(
                  (event) => event._id !== eventId
                ),
              };
            }
            return day;
          }),
        },
      };
    },
    CLEAR_PROJECT: (state) => {
      state.project = {};
    },
  },
});

export const {
  SET_CURRENT_PROJECT,
  ADD_HOTEL_TO_PROJECT,
  ADD_EVENT_TO_SCHEDULE,
  REMOVE_HOTEL_FROM_PROJECT,
  REMOVE_EVENT_FROM_SCHEDULE,
  CLEAR_PROJECT,
} = currentProjectSlice.actions;

export const selectCurrentProject = (state) => state.currentProject.project;

export default currentProjectSlice.reducer;
