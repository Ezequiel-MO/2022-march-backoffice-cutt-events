import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const RestaurantUpdate = () => {
  let params = useParams();
  const [originalRestaurant, setOriginalRestaurant] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
    textContent: false,
    /*  location: false, */
    price: false,
    introduction: false,
  });

  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    name: "",
    city: "",
    textContent: "",
    /*  location: '', */
    price: "",
    introduction: "",
  });

  const filterOutRestaurant = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
        item !== "location" &&
        item !== "imageContentUrl" &&
        item !== "transfer" &&
        item !== "introduction"
      ) {
        filteredOutObj[item] = obj[item];
      }
    });
    return filteredOutObj;
  };

  useEffect(() => {
    setUpdatedRestaurant(originalRestaurant);
  }, [originalRestaurant]);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const recovered = await baseAPI.get(
          `v1/restaurants/${params.restaurantId}`
        );
        const filteredOutRestaurantObj = filterOutRestaurant(
          recovered.data.data.data
        );
        setOriginalRestaurant(filteredOutRestaurantObj);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurant();
  }, [params.restaurantId]);

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateRestaurant = (e) => {
    setUpdatedRestaurant({
      ...updatedRestaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await baseAPI.patch(
        `v1/restaurants/${params.restaurantId}`,
        updatedRestaurant
      );
      toast.success("Restaurant Updated", toastOptions);
      setUpdatedRestaurant(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalRestaurant = (
    <>
      {Object.keys(originalRestaurant).map((field) => (
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
                  value={updatedRestaurant[`${field}`]}
                  onChange={handleUpdateRestaurant}
                  autoFocus
                  className="w-3/4"
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedRestaurant[`${field}`]}
                  onChange={handleUpdateRestaurant}
                  className="absolute right-3.5 bottom-2 w-2/3"
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedRestaurant[`${field}`]
                ? `${field} : ${updatedRestaurant[field]}`
                : `${field} : ${originalRestaurant[field]}`}
            </div>
          )}
        </li>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Restaurant</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <ul className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalRestaurant}
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

export default RestaurantUpdate;
