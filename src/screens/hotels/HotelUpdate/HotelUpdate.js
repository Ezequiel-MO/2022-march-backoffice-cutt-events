import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const HotelUpdate = () => {
  let params = useParams();
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
    setUpdatedHotel(originalHotel);
  }, [originalHotel]);

  useEffect(() => {
    const getHotel = async () => {
      try {
        const recovered = await baseAPI.get(`v1/hotels/${params.hotelId}`);
        const filteredOutHotelObj = filterOutHotel(recovered.data.data.data);
        setOriginalHotel(filteredOutHotelObj);
      } catch (error) {
        console.log(error);
      }
    };
    getHotel();
  }, [params.hotelId]);

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
    console.log(updatedHotel);
    try {
      const updated = await baseAPI.patch(
        `v1/hotels/${params.hotelId}`,
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
        <li key={`${field}`}>
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
                  className="w-3/4"
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
            <li
              className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
              onClick={() => setEditFieldStatus(`${field}`, true)}
            >
              {updatedHotel[`${field}`]
                ? `${field} : ${updatedHotel[field]}`
                : `${field} : ${originalHotel[field]}`}
            </li>
          )}
        </li>
      ))}
    </>
  );

  const renderUpdatedHotel = (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Name
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            City
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Number of Stars
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Number of Rooms
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Check In/Out
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Meeting Rooms
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Wifi Speed
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Swimming Pool
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Restaurants
          </th>
          <th className="text-sm font-medium text-white-50 px-6 py-4 text-left">
            Description
          </th>
        </tr>
      </thead>
    </table>
  );

  return (
    <div className="flex align-center justify-center">
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl mb-4 indent-8">Original Hotel</h1>
          <ul className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
            {renderOriginalHotel}
          </ul>
        </div>

        <button
          className="mt-4 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          type="submit"
        >
          Update and Save
        </button>
      </form>

      <div>
        <h3>Updated Hotel</h3>
        {renderUpdatedHotel}
      </div>
    </div>
  );
};

export default HotelUpdate;
