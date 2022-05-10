import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../dev-data/toast";

const UpdateLogic = (params) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    name: "",
    city: "",
    textContent: "",
    longitude: "",
    latitude: "",
    price: "",
    introduction: "",
  });
  const [originalEvent, setOriginalEvent] = useState({});
  const [isInput, setIsInput] = useState({
    name: false,
    city: false,
    textContent: false,
    longitude: false,
    latitude: false,
    price: false,
    introduction: false,
  });

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

  useEffect(() => {
    setUpdatedEvent(originalEvent);
  }, [originalEvent]);

  const filterOutEvent = (obj) => {
    let filteredOutObj = {};
    Object.keys(obj).forEach((item) => {
      if (
        item !== "_id" &&
        item !== "__v" &&
        item !== "updatedAt" &&
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
    const getEvent = async () => {
      try {
        const recovered = await baseAPI.get(`v1/events/${params.eventId}`);
        const filteredOutEventObj = filterOutEvent(recovered.data.data.data);
        const filteredOutEventObjWithCoords = {
          ...filteredOutEventObj,
          longitude: recovered.data.data.data.location.coordinates[1],
          latitude: recovered.data.data.data.location.coordinates[0],
        };
        delete filteredOutEventObjWithCoords.location;
        setOriginalEvent(filteredOutEventObjWithCoords);
      } catch (error) {
        console.log(error);
      }
    };
    getEvent();
  }, [params.eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEventBackwithLocation = {
      ...updatedEvent,
      location: {
        type: "Point",
        coordinates: [updatedEvent.longitude, updatedEvent.latitude],
      },
    };
    delete updatedEventBackwithLocation.longitude;
    delete updatedEventBackwithLocation.latitude;
    try {
      const updated = await baseAPI.patch(
        `v1/events/${params.eventId}`,
        updatedEventBackwithLocation
      );
      toast.success("Event Updated", toastOptions);
      setUpdatedEvent(updated.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSubmit,
    originalEvent,
    updatedEvent,
    isInput,
    handleUpdateEvent,
    setEditFieldStatus,
  };
};

export default UpdateLogic;
