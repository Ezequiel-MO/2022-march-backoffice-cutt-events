import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

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
        item !== "transfer" &&
        item !== "introduction"
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
        toast.error(error.response.data.message, toastOptions);
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
      toast.success("Hotel Updated", toastOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOriginalEvent = (
    <>
      {Object.keys(originalEvent).map((field) => (
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
                  value={updatedEvent[`${field}`]}
                  onChange={handleUpdateEvent}
                  autoFocus
                  className="w-full h-32 mt-2"
                />
              ) : (
                <input
                  type="text"
                  placeholder={`New ${field}  ...`}
                  onBlur={() => setEditFieldStatus(`${field}`, false)}
                  name={`${field}`}
                  value={updatedEvent[`${field}`]}
                  onChange={handleUpdateEvent}
                  className="absolute right-3.5 bottom-2 w-2/3"
                  autoFocus
                />
              )}
            </div>
          ) : (
            <div onClick={() => setEditFieldStatus(`${field}`, true)}>
              {updatedEvent[`${field}`]
                ? `${field} : ${updatedEvent[field]}`
                : `${field} : ${originalEvent[field]}`}
            </div>
          )}
        </li>
      ))}
    </>
  );

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Original Event</h1>
      <form
        onSubmit={handleSubmit}
        className="flex align-center justify-around w-3/4 mx-auto"
      >
        <ul className="bg-white rounded-lg border border-gray-200 w-1/2 text-white-50">
          {renderOriginalEvent}
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

export default EventUpdate;
