import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const RestaurantUpdate = () => {
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

  const location = useLocation();

  const filterOutRestaurant = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
        item !== "location" &&
        item !== "imageContentUrl" &&
        item !== "transfer"
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
          `v1/restaurants/${location.state.restaurantId}`
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
  }, [location.state.restaurantId]);

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
        `v1/restaurants/${location.state.restaurantId}`,
        updatedRestaurant
      );
      setUpdatedRestaurant(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalRestaurant = (
    <>
      {Object.keys(originalRestaurant).map((field) => (
        <div key={`${field}`}>
          {isInput[field] ? (
            <div style={{ display: "flex" }}>
              <p>{field} :</p>
              {field === "textContent" || field === "introduction" ? (
                <textarea
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedRestaurant[`${field}`]}
                  onChange={handleUpdateRestaurant}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedRestaurant[`${field}`]}
                  onChange={handleUpdateRestaurant}
                  autoFocus
                />
              )}
            </div>
          ) : (
            <li onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedRestaurant[`${field}`]
                ? `${field} : ${updatedRestaurant[field]}`
                : `${field} : ${originalRestaurant[field]}`}
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
          <h3>Original Restaurant</h3>
          {renderOriginalRestaurant}
        </div>
        <hr />
        <button type="submit">Update and Save</button>
      </form>
      <hr />
      <div>
        <h3>Updated Restaurant</h3>
        {JSON.stringify(updatedRestaurant)}
      </div>
    </>
  );
};

export default RestaurantUpdate;
