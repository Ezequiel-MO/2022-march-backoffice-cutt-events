import { actionTypes } from "../Constants/ProjectConstants";

const initialState = {
  projects: [],
};

//Base Project
export const projectListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return { ...state, projects: action.payload };

    default:
      return state;
  }
};
