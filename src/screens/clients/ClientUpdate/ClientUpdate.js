import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const ClientUpdate = () => {
  let params = useParams();
  const [originalClient, setOriginalClient] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    country: false,
  });

  const [updatedClient, setUpdatedClient] = useState({
    name: "",
    country: "",
  });

  const filterOutEvent = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "clientProjectManagers" &&
        item !== "updatedAt" &&
        item !== "createdAt"
      ) {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    setUpdatedClient(originalClient);
  }, [originalClient]);

  useEffect(() => {
    const getClient = async () => {
      try {
        const recovered = await baseAPI.get(`v1/clients/${params.clientId}`);
        const filteredOutEventObj = filterOutEvent(recovered.data.data.data);
        setOriginalClient(filteredOutEventObj);
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    };
    getClient();
  }, [params.clientId]);

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateClient = (e) => {
    setUpdatedClient({
      ...updatedClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await baseAPI.patch(
        `v1/clients/${params.clientId}`,
        updatedClient
      );
      setUpdatedClient(updated.data.data.data);
      toast.success("Client Updated", toastOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalClient = (
    <>
      {Object.keys(originalClient).map((field) => (
        <li
          key={`${field}`}
          className="relative px-6 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer"
        >
          {isInput[field] ? (
            <div>
              <p className="font-bold">{field} :</p>
              {field === "textContent" || field === "introduction" ? (
                <textarea
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedClient[`${field}`]}
                  onChange={handleUpdateClient}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedClient[`${field}`]}
                  onChange={handleUpdateClient}
                  className="absolute right-3.5 bottom-2 w-2/3"
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedClient[`${field}`]
                ? `${field} : ${updatedClient[field]}`
                : `${field} : ${originalClient[field]}`}
            </div>
          )}
        </li>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Client</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <ul className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalClient}
        </ul>

        <button
          className="h-12 px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          type="submit"
        >
          Update and Save
        </button>
      </form>
    </>
  );
};

export default ClientUpdate;
