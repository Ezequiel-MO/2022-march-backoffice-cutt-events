import { useDispatch } from "react-redux";
import baseAPI from "../../../axios/axiosConfig";
import { SET_CURRENT_PROJECT } from "../../../redux/features/CurrentProjectSlice";
import ProjectMasterForm from "./ProjectMasterForm";
import { useNavigate } from "react-router-dom";
import {
  computeTotalDays,
  whichDay,
} from "../../../helperFunctions/helperFunctions";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";

const ProjectSpecs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transformData = (data, diffDays) => {
    let transformedData = { ...data };
    transformedData.clientAccManager = [data.clientAccountManager.toString()];
    transformedData.schedule = [];
    for (let i = 1; i <= diffDays; i++) {
      transformedData.schedule.push({
        date: whichDay(i, diffDays),
        dayOfEvent: i,
        morningEvents: [],
        lunch: [],
        afternoonEvents: [],
        dinner: [],
        transfer_in: [],
        transfer_out: [],
      });
    }
    return transformedData;
  };

  const postToEndpoint = async (data, endPoint) => {
    const diffDays = computeTotalDays(data.arrivalDay, data.departureDay);
    let transformedData = transformData(data, diffDays);

    try {
      const res = await baseAPI.post(`v1/${endPoint}`, transformedData);
      localStorage.setItem(
        "currentProject",
        JSON.stringify(res.data.data.data)
      );
      dispatch(SET_CURRENT_PROJECT(res.data.data.data));
      toast.success("Base Project Created", toastOptions);
      navigate("/hotel/list");
    } catch (error) {
      toast.error(
        `Error Creating Base Project, ${error.message}`,
        toastOptions
      );
    }
  };

  const submitForm = (values, endpoint) => {
    postToEndpoint(values, endpoint);
  };

  return (
    <>
      <ProjectMasterForm submitForm={submitForm} />
    </>
  );
};

export default ProjectSpecs;
