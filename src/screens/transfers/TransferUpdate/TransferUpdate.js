import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

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
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalTransfer = (
    <>
      {Object.keys(originalTransfer).map((field) => (
        <div key={`${field}`}>
          {isInput[field] ? (
            <div style={{ display: "flex" }}>
              <p>{field} :</p>
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
                  autoFocus
                />
              )}
            </div>
          ) : (
            <li onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedTransfer[`${field}`]
                ? `${field} : ${updatedTransfer[field]}`
                : `${field} : ${originalTransfer[field]}`}
            </li>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Original Transfer</h3>
          {renderOriginalTransfer}
        </div>
        <hr />
        <button type="submit">Update and Save</button>
      </form>
      <hr />
      <div>
        <h3>Updated Transfer</h3>
        {JSON.stringify(updatedTransfer)}
      </div>
    </>
  );
};

export default TransferUpdate;
