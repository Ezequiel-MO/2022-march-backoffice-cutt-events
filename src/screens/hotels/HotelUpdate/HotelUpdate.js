import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

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
        item !== "price" &&
        item !== "introduction" &&
        item !== "coordinates"
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
        toast.error(error.response.data.message, toastOptions);
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
    try {
      const updated = await baseAPI.patch(
        `v1/hotels/${params.hotelId}`,
        updatedHotel
      );
      setUpdatedHotel(updated.data.data.data);
      toast.success("Hotel Updated", toastOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalHotel = (
    <>
      {Object.keys(originalHotel).map((field) => (
        <div
          key={`${field}`}
          className="relative px-6 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer"
        >
          {isInput[field] ? (
            <div>
              <p className="font-bold">{field} :</p>
              {field === "textContent" || field === "introduction" ? (
                <textarea
                  className="w-full h-32 mt-2"
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
                  className="absolute right-3.5 bottom-2 w-2/3"
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedHotel[`${field}`]
                ? `${field} : ${updatedHotel[field]}`
                : `${field} : ${originalHotel[field]}`}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Hotel</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <div className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalHotel}
        </div>
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

export default HotelUpdate;
