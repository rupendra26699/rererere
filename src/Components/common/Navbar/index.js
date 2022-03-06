import React from "react";
import collapse from "../../../Assets/images/collapse.svg";
import logo from "../../../Assets/images/logo.svg";
import bell from "../../../Assets/images/bell.svg";
import { useSelector, useDispatch } from "react-redux";
import Logout from "../../common/Navbar/logout";
//import { showSideBar, hideSideBar } from "../../../redux/slices/uiSlice";
import { showNavigationSidebar, hideNavigationSidebar } from "../../../redux/slices/uiSlice/common";

const Navbar = (props) => {

  const sidebarShown = useSelector((state) => state.newUiState.commonUi.showNavigationSidebar);
  const dispatch = useDispatch();
  const handleSidebarToggle = () => {
    if (sidebarShown) {
      dispatch(hideNavigationSidebar());
      return;
    }
    dispatch(showNavigationSidebar());
  };

  return (
    <div className="w-[100%] bg-white shadow-md sticky z-[999]">
      <div className="flex items-center justify-between pt-1 px-5">
        <div className="flex items-center">
          <img
            src={collapse}
            className="w-[20px] h-[30px]  mr-5 hover:cursor-pointer"
            onClick={() => handleSidebarToggle()}
            alt="toggle sidebar"
          />
          <img src={logo} className="w-[125px] h-[50px] hover:cursor-pointer" alt="Company Logo" />
        </div>
        <div className="flex items-center">
          <img src={bell} className="w-[25px] hover:cursor-pointer" alt="notification icon" />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Navbar

