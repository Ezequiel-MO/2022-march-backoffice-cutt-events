import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import SearchBar from "../../../components/SearchBar";
import { toastOptions } from "../../../dev-data/toast";
import ClientListItem from "./ClientListItem";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  const handleDeleteClient = async (clientId) => {
    try {
      await baseAPI.delete(`v1/clients/${clientId}`);
      toast("Client Deleted", toastOptions);
      setClients(clients.filter((client) => client._id !== clientId));
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  };

  useEffect(() => {
    const getClientList = async () => {
      try {
        const response = await baseAPI.get(`/v1/clients`);
        setClients(response.data.data.data);
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    };
    getClientList();
  }, []);

  const clientList = clients
    ?.slice(0, 15)
    .map((client) => (
      <ClientListItem
        key={client._id}
        client={client}
        handleDeleteClient={handleDeleteClient}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <h1 className="text-2xl">Client List</h1>
        <SearchBar />
        <p className="flex flex-row items-center">
          <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
          <span className="ml-2">
            Swipe restaurants right to update / left to remove restaurant
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-row">
        <div className="flex-1 m-4 flex-col">{clientList}</div>
      </div>
    </>
  );
};

export default ClientList;
