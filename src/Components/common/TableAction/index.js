import React, { useState } from "react";
import threeDots from "../../../Assets/images/three-dots.svg";
import ClickAwayListener from 'react-click-away-listener';


const TableAction = ({ actionItems,rowData }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onClickAway = () => {
    setShowTooltip(false)
  }
  if (!(actionItems && Array.isArray(actionItems) && actionItems.length)) {
    return null;
  }
  return (
    <div className="relative">
      <img
        className="relative align-middle hover:cursor-pointer"
        src={threeDots}
        alt=""
        onClick={() => setShowTooltip(!showTooltip)}
        width="30"
      />
      {showTooltip && (
        <ClickAwayListener onClickAway={onClickAway}>
          <div className="flex-col flex absolute top-2 left-[-90px] border py-3 rounded-xl min-w-[100px] bg-white shadow-md">
            {actionItems.map((action, actionIdx) => (
              <button
                className="w-[100%] h-[30px] border-0 hover:bg-onHoverBackground"
                key={actionIdx}
                onClick={() => {
                  action.handleClick(rowData);
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default TableAction;
