import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import TransferMasterForm from "./TransferMasterForm";
import { toastOptions } from "../../../dev-data/toast";
import { toast, ToastContainer } from "react-toastify";

const TransferSpecs = () => {
  const navigate = useNavigate();

  const postToEndpoint = async (data, endPoint) => {
    try {
      await baseAPI.post(`v1/${endPoint}`, data);
      toast.success("Transfer service created", toastOptions);
      setTimeout(() => {
        navigate("/transfer/list");
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = (values, endpoint) => {
    postToEndpoint(values, endpoint);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <TransferMasterForm submitForm={submitForm} />
    </>
  );
};

export default TransferSpecs;
