import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const HotelUpdate = () => {
  const [originalHotel, setOriginalHotel] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
  });
  const [updatedHotel, setUpdatedHotel] = useState({
    name: "",
    city: "",
  });
  const location = useLocation();

  useEffect(() => {
    const getHotel = async () => {
      try {
        const recovered = await baseAPI.get(
          `v1/hotels/${location.state.hotelId}`
        );
        setOriginalHotel(recovered.data.data.data);
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
      {isInput.name ? (
        <input
          type="text"
          placeholder="New hotel name ..."
          onBlur={() => setEditFieldStatus("name", false)}
          name="name"
          value={updatedHotel.name}
          onChange={handleUpdateHotel}
          autoFocus
        />
      ) : (
        <li onClick={() => setEditFieldStatus("name", true)}>
          {updatedHotel.name ? updatedHotel.name : originalHotel.name}
        </li>
      )}
      {isInput.city ? (
        <input
          type="text"
          placeholder="New city ..."
          onBlur={() => setEditFieldStatus("city", false)}
          name="city"
          value={updatedHotel.city}
          onChange={handleUpdateHotel}
          autoFocus
        />
      ) : (
        <li onClick={() => setEditFieldStatus("city", true)}>
          {updatedHotel.city ? updatedHotel.city : originalHotel.city}
        </li>
      )}
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
