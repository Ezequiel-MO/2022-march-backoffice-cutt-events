import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";
import ClientMasterForm from "./ClientMasterForm";

const ClientSpecs = () => {
  const navigate = useNavigate();
  const postToEndpoint = async (data, endPoint) => {
    try {
      await baseAPI.post(`v1/${endPoint}`, data);
      toast.success("Client Created", toastOptions);
      navigate("/client/list");
    } catch (error) {
      toast.error(`Error Creating Client, ${error.message}`, toastOptions);
    }
  };
  const submitForm = (values, endpoint) => {
    postToEndpoint(values, endpoint);
  };
  return (
    <>
      <ClientMasterForm submitForm={submitForm} />
    </>
  );
};

export default ClientSpecs;
