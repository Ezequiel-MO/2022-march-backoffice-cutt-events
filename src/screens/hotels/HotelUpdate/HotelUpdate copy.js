import React, { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useLocation } from "react-router-dom";

const HotelUpdate = () => {
  const location = useLocation();
  const [updatedHotel, setUpdatedHotel] = useState({});
  const [originalHotel, setOriginalHotel] = useState({});
  const [newNameValue, setNewNameValue] = useState("");
  const [inputField, setInputField] = useState(false);
  //done ----- display original Hotel in a list
  //done ------ each line within the list should be clickable
  //done ------ on click, the line should toggled between text and input
  //done -------on blur, the line should be text
  //done ------- text entered should be captured in an object
  //done ------- there should be a button on the end saying update and save
  //on click of the button, the object should patch the original object

  const transformObject = (key, value) => {
    return {
      ...originalHotel,
      key: value,
    };
  };

  const handleHotelUpdate = async (key, value) => {
    const transformedObject = transformObject(key, value);
    try {
      const updated = await baseAPI.patch(
        `v1/hotels/${location.state.hotelId}`,
        transformedObject
      );
      setUpdatedHotel(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleInput = () => setInputField((prev) => !prev);

  const handleGetSingleHotel = async () => {
    try {
      const recovered = await baseAPI.get(
        `v1/hotels/${location.state.hotelId}`
      );
      setOriginalHotel(recovered.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalHotel = (obj) => {
    return (
      <>
        <li onClick={toggleInput}>
          {inputField ? (
            <input
              type="text"
              value={newNameValue}
              onChange={(e) => setNewNameValue(e.target.value)}
              placeholder="New hotel name ..."
              autoFocus
            />
          ) : (
            obj.name
          )}
          <button onClick={() => handleHotelUpdate(obj.name)}>update</button>
        </li>
        <li>
          {obj.city}
          <button>update</button>
        </li>
      </>
    );
  };

  return (
    <>
      <h3>Original Hotel</h3>
      <ul>{renderOriginalHotel(originalHotel)}</ul>

      <hr />
      <h3>Updated Hotel</h3>
      {JSON.stringify(updatedHotel)}
      <hr />
      <button onClick={handleGetSingleHotel}>
        {`Recover hotel - ${location.state.hotelName}`}
      </button>
    </>
  );
};

export default HotelUpdate;
