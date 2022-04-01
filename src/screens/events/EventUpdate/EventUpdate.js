import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";

const EventUpdate = () => {
  let params = useParams();
  const [originalEvent, setOriginalEvent] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
    textContent: false,
    /*  location: false, */
    price: false,
    introduction: false,
  });

  const [updatedEvent, setUpdatedEvent] = useState({
    name: "",
    city: "",
    textContent: "",
    /*  location: '', */
    price: "",
    introduction: "",
  });

  const filterOutEvent = (obj) => {
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
    setUpdatedEvent(originalEvent);
  }, [originalEvent]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const recovered = await baseAPI.get(`v1/events/${params.eventId}`);
        const filteredOutEventObj = filterOutEvent(recovered.data.data.data);
        setOriginalEvent(filteredOutEventObj);
      } catch (error) {
        console.log(error);
      }
    };
    getEvent();
  }, [params.eventId]);

  const setEditFieldStatus = (key, bool) => {
    setIsInput({
      ...isInput,
      [key]: bool,
    });
  };

  const handleUpdateEvent = (e) => {
    setUpdatedEvent({
      ...updatedEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await baseAPI.patch(
        `v1/events/${params.eventId}`,
        updatedEvent
      );
      setUpdatedEvent(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalEvent = (
    <>
      {Object.keys(originalEvent).map((field) => (
        <div key={`${field}`}>
          {isInput[field] ? (
            <div style={{ display: "flex" }}>
              <p>{field} :</p>
              {field === "textContent" || field === "introduction" ? (
                <textarea
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedEvent[`${field}`]}
                  onChange={handleUpdateEvent}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedEvent[`${field}`]}
                  onChange={handleUpdateEvent}
                  autoFocus
                />
              )}
            </div>
          ) : (
            <li onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedEvent[`${field}`]
                ? `${field} : ${updatedEvent[field]}`
                : `${field} : ${originalEvent[field]}`}
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
          <h3>Original Event</h3>
          {renderOriginalEvent}
        </div>
        <hr />
        <button type="submit">Update and Save</button>
      </form>
      <hr />
      <div>
        <h3>Updated Event</h3>
        {JSON.stringify(updatedEvent)}
      </div>
    </>
  );
};

export default EventUpdate;
