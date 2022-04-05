import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const TransferUpdate = () => {
  let params = useParams();
  const [originalTransfer, setOriginalTransfer] = useState({});
  const [isInput, setIsInput] = useState({
    city: false,
    company: false,
    transfer_in_out: false,
    dispo_4h: false,
    hextra: false,
    hextra_night: false,
    dispo_5h_out: false,
    dispo_4h_airport: false,
    dispo_4h_night: false,
    transfer_in_out_night: false,
    dispo_6h_night: false,
    vehicleType: false,
    vehicleCapacity: false,
  });

  const [updatedTransfer, setUpdatedTransfer] = useState({
    city: "",
    company: "",
    transfer_in_out: "",
    dispo_4h: "",
    hextra: "",
    hextra_night: "",
    dispo_5h_out: "",
    dispo_4h_airport: "",
    dispo_4h_night: "",
    transfer_in_out_night: "",
    dispo_6h_night: "",
    vehicleType: "",
    vehicleCapacity: "",
  });

  const filterOutTransfer = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (item !== "_id" && item !== "__v" && item !== "updatedAt") {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    setUpdatedTransfer(originalTransfer);
  }, [originalTransfer]);

  useEffect(() => {
    const getTransfer = async () => {
      try {
        const recovered = await baseAPI.get(
          `v1/transfers/${params.transferId}`
        );
        const filteredOutTransferObj = filterOutTransfer(
          recovered.data.data.data
        );
        setOriginalTransfer(filteredOutTransferObj);
      } catch (error) {
        console.log(error);
      }
    };
    getTransfer();
  }, [params.transferId]);

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateTransfer = (e) => {
    setUpdatedTransfer({
      ...updatedTransfer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await baseAPI.patch(
        `v1/transfers/${params.transferId}`,
        updatedTransfer
      );
      setUpdatedTransfer(updated.data.data.data);
      toast.success("Transfer service Updated", toastOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalTransfer = (
    <>
      {Object.keys(originalTransfer).map((field) => (
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
                  value={updatedTransfer[`${field}`]}
                  onChange={handleUpdateTransfer}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedTransfer[`${field}`]}
                  onChange={handleUpdateTransfer}
                  className="absolute right-3.5 bottom-2 w-2/3"
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedTransfer[`${field}`]
                ? `${field} : ${updatedTransfer[field]}`
                : `${field} : ${originalTransfer[field]}`}
            </div>
          )}
        </li>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Transfer</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <ul className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalTransfer}
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

export default TransferUpdate;
