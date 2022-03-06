import React from 'react'

import admin from "../../../Assets/images/admin.svg";

import { useSelector, useDispatch } from "react-redux"
//import { showLogoutDialog, hideLogoutDialog } from "../../../redux/slices/uiSlice";
import { showLogoutPopup, hideLogoutPopup } from '../../../redux/slices/uiSlice/common';
const LogoutDialog = (props) => {
  const isLogoutPopupShown = useSelector((state) => state.newUiState.commonUi.showLogoutPopup);
  const dispatch = useDispatch();


  const handleLogoutToggle = () => {
    if (isLogoutPopupShown) {
      dispatch(hideLogoutPopup());
      return;
    }
    dispatch(showLogoutPopup());
  };

  return (
    <div>
      <div className="flex justify-center items-center mr-5">
        <img
          src={admin}
          className="w-8 h-8 ml-12 rounded-full border bg-iconBackColor hover:cursor-pointer"
          onClick={() => handleLogoutToggle()}
          alt=""
        />
        <div className='flex-col hover:cursor-pointer'>
          <span className='ml-[10px] font-primary font-semibold text-[14px] '>Super Admin Name</span>
          <p className='ml-[10px] font-primary font-normal text-[12px] text-textlight' >Super Admin</p>
        </div>
      </div>
    </div>
  )
}

export default LogoutDialog;

