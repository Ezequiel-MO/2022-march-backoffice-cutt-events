import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_EVENT_TO_PROJECT } from "../../../redux/features/CurrentProjectSlice";
import TransferList from "../../transfers/TransferList/TransferList";

const AddEventToSchedule = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventWithTransfer, setEventWithTransfer] = useState(
    location.state.event
  );

  const handleAddTransfer = (transferService) => {
    setEventWithTransfer((prevState) => ({
      ...prevState,
      transfer: [transferService],
    }));
    alert("Transfer added");
  };

  const handleAddEvent = () => {
    dispatch(
      ADD_EVENT_TO_PROJECT({
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
        event: eventWithTransfer,
      })
    );
    alert("Event Added to Schedule");
    navigate("/project/schedule");
  };
  return (
    <>
      <TransferList
        addEventToSchedule={true}
        handleAddTransfer={handleAddTransfer}
      />
      <button onClick={handleAddEvent}>Add Event To schedule</button>
    </>
  );
};

export default AddEventToSchedule;
