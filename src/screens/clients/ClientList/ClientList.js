import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const ClientList = () => {
  const navigate = useNavigate();
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

  const clientList = clients?.slice(0, 15).map((client) => (
    <tr key={client._id}>
      <td>{client.firstName}</td>
      <td>{client.familyName}</td>
      <td>{client.email}</td>
      <td>{client.clientCompany}</td>
      <td>{client.country}</td>

      <td
        className="hover:cursor-pointer"
        onClick={() => navigate(`/client/${client._id}/update`)}
      >
        <Icon
          icon="arcticons:huawei-system-update"
          color="#ea5933"
          width="30"
        />
      </td>
      <td
        className="hover:cursor-pointer"
        onClick={() => handleDeleteClient(client._id)}
      >
        <Icon icon="ei:trash" color="#ea5933" width="30" />
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Client List</h1>
      <hr />
      <div className="container grid grid-cols-4 gap-4 my-4">
        <table className="table-auto col-span-3">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th>First Name</th>
              <th>Family Name</th>
              <th>Email Address</th>
              <th>Company</th>
              <th>Country</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-white-50">{clientList}</tbody>
        </table>
      </div>
    </>
  );
};

export default ClientList;
