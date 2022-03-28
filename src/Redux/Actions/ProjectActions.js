import { actionTypes } from "../Constants/ProjectConstants";
import baseAPI from "../../axios/axiosConfig";

export const fetchProjects = () => async (dispatch) => {
  const response = await baseAPI.get("v1/projects");
  dispatch({
    type: actionTypes.FETCH_PROJECTS,
    payload: response.data.data.data,
  });
};

export const fetchProject = (id) => async (dispatch) => {
  const response = await baseAPI.get(`v1/projects/${id}`);
  dispatch({
    type: actionTypes.SELECTED_PROJECT,
    payload: response.data.data.data,
  });
};
