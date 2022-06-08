import axios from "axios";

const baseAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}` /*  "https://cuttevents.herokuapp.com" */,
  /* headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
  }, */
});

export default baseAPI;
