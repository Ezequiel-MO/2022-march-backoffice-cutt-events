import React from "react";
import { useNavigate } from "react-router-dom";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const TransferListItem = ({ transfer, handleDeleteTransfer }) => {
  const navigate = useNavigate();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className="bg-green-500 text-lime-50 px-10 font-bold rounded uppercase"
        onClick={() =>
          navigate(`/transfer/specs`, {
            state: { transfer },
          })
        }
      >
        Update
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        className="bg-red-500 text-lime-50 px-10 font-bold rounded uppercase"
        onClick={() => handleDeleteTransfer(transfer._id)}
        destructive={true}
      >
        Remove
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <div className="mb-4 p-3 bg-green-50 hover:bg-green-100 cursor-pointer rounded-md">
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div className="grid grid-cols-4 w-full">
            <p>{transfer.company}</p>
            <p>{transfer.city}</p>
            <p>{transfer.vehicleType}</p>
            <p>{`${transfer.vehicleCapacity} seats`}</p>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  );
};

export default TransferListItem;
