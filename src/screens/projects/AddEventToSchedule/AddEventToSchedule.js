import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../../dev-data/toast";
import { ADD_EVENT_TO_SCHEDULE } from "../../../redux/features/CurrentProjectSlice";
import DetailedTransferList from "../../transfers/TransferList/DetailedTransferList";
import AddIntroToEvent from "../AddIntroToEvent/AddIntroToEvent";

const AddEventToSchedule = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [event] = useState(location.state.event);

  const handleAddTransfer = (transferService, selectedService) => {
    const transferData = { ...transferService, selectedService };
    event.transfer = [transferData];
    toast.success("Transfer added", toastOptions);
  };

  const handleAddIntro = (intro) => {
    event.introduction = [intro];
    toast.success("Introduction added", toastOptions);
  };

  const handleAddEvent = () => {
    dispatch(
      ADD_EVENT_TO_SCHEDULE({
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
        event,
      })
    );
    toast.success("Event Added to Schedule", toastOptions);
    navigate("/project/schedule");
  };

  return (
    <>
      <DetailedTransferList handleAddTransfer={handleAddTransfer} />
      <AddIntroToEvent submitForm={handleAddIntro} />
      <hr />
      <button
        onClick={handleAddEvent}
        className="mx-8 my-8 w-64 h-12 px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        type="submit"
      >
        Add Event To schedule
      </button>
    </>
  );
};

export default AddEventToSchedule;
