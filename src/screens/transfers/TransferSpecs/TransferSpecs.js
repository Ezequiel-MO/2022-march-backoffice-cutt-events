import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import TransferMasterForm from "./TransferMasterForm";

const TransferSpecs = () => {
  const navigate = useNavigate();

  const postToEndpoint = async (data, endPoint) => {
    try {
      await baseAPI.post(`v1/${endPoint}`, data);
      alert("Transfer service Created");
      navigate("/transfer/list");
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = (values, endpoint) => {
    postToEndpoint(values, endpoint);
  };

  return (
    <>
      <TransferMasterForm submitForm={submitForm} />
    </>
  );
};

export default TransferSpecs;
