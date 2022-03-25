import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const HotelUpdate = () => {
  const [originalHotel, setOriginalHotel] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
    introduction: false,
    /*  location: false, */
    checkin_out: false,
    numberRooms: false,
    numberStars: false,
    restaurants: false,
    swimmingPool: false,
    wifiSpeed: false,
    textContent: false,
  });
  const [updatedHotel, setUpdatedHotel] = useState({
    name: "",
    city: "",
    introduction: "",
    /*   location: "", */
    checkin_out: "",
    numberRooms: "",
    numberStars: "",
    restaurants: "",
    swimmingPool: "",
    wifiSpeed: "",
    textContent: "",
  });
  const location = useLocation();

  const filterOutHotel = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
        item !== "location" &&
        item !== "imageContentUrl" &&
        item !== "price"
      ) {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    const getHotel = async () => {
      try {
        const recovered = await baseAPI.get(
          `v1/hotels/${location.state.hotelId}`
        );
        const filteredOutHotelObj = filterOutHotel(recovered.data.data.data);
        setOriginalHotel(filteredOutHotelObj);
      } catch (error) {
        console.log(error);
      }
    };
    getHotel();
  }, [location.state.hotelId]);

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateHotel = (e) => {
    setUpdatedHotel({
      ...updatedHotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await baseAPI.patch(
        `v1/hotels/${location.state.hotelId}`,
        updatedHotel
      );
      setUpdatedHotel(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalHotel = (
    <>
      {Object.keys(originalHotel).map((field) => (
        <div key={`${field}`}>
          {isInput[field] ? (
            <div style={{ display: "flex" }}>
              <p>{field} :</p>
              {field === "textContent" || field === "introduction" ? (
                <textarea
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedHotel[`${field}`]}
                  onChange={handleUpdateHotel}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedHotel[`${field}`]}
                  onChange={handleUpdateHotel}
                  autoFocus
                />
              )}
            </div>
          ) : (
            <li onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedHotel[`${field}`]
                ? `${field} : ${updatedHotel[field]}`
                : `${field} : ${originalHotel[field]}`}
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
          <h3>Original Hotel</h3>
          {renderOriginalHotel}
        </div>
        <hr />
        <button type="submit">Update and Save</button>
      </form>
      <hr />
      <div>
        <h3>Updated Hotel</h3>
        {JSON.stringify(updatedHotel)}
      </div>
    </>
  );
};

export default HotelUpdate;
