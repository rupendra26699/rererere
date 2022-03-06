import React from "react";
import { useNavigate } from "react-router-dom";
import power from "../../../../Assets/images/power.svg";
import key from "../../../../Assets/images/key.svg";
import LogoutDialog from "../../logoutDialog";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import ClickAwayListener from "react-click-away-listener";
import { hideLogoutPopup } from "../../../../redux/slices/uiSlice/common";
const Logout = () => {
  let isLogoutPopupShown = useSelector(
    (state) => state.newUiState.commonUi.showLogoutPopup
  );
  const dispatch = useDispatch();
  const onClickAway = () => {

    if (isLogoutPopupShown) {
      dispatch(hideLogoutPopup())
    }

  }
  const history = useNavigate();
  return (
    <>
      <LogoutDialog />
      <ClickAwayListener onClickAway={onClickAway}>
        <div

          className={clsx({
            "flex-col absolute top-[56px] left-[85%] w-[170px] h-[97px] bg-white  rounded-b-xl shadow-lg transition-all duration-1000":
              true,
            hidden: !isLogoutPopupShown,
          })}
        >
          <button
            onClick={() => history("/change-password")}
            className="hover:bg-onHoverBackground w-[100%] h-[50%] p-2 flex items-center text-sm"
          >
            <img src={key} alt="Change Password Icon" className="w-3 h-4 mr-2" />

            Change Password
          </button>
          <button
            onClick={() => history("/")}
            className="hover:bg-onHoverBackground w-[100%] h-[50%] pr-2 flex items-center text-sm rounded-b-xl"
          >
            {" "}
            <img src={power} alt="Logout Icon" className="w-3 h-4 mx-2" />
            Logout
          </button>
        </div>
      </ClickAwayListener>

    </>
  );
};

export default Logout;

