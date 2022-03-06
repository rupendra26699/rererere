import React from 'react'
import { connect } from "react-redux";
import admin from "../../Assets/images/admin.svg";
import { HIDE_LOGOUT, SHOW_LOGOUT } from '../../Store/actions';

const LogoutDialog = (props) => {
     const { collapsedLogout, showLogoutDialog ,hideLogoutDialog } = props;
      
const handleLogoutToggle = () => {
    if (collapsedLogout) {
      showLogoutDialog();
      return;
    }
    hideLogoutDialog();
  };

  return (
    <div>
       <div className="admin-box">
            <img
              src={admin}
              className="admin-icon"
              onClick={() => handleLogoutToggle()}
            />
            <div>
              <span>Super Admin Name</span>
              <p>Super Admin</p>
            </div>
          </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    collapsedLogout: state.toggleLogoutDialog.collapsedLogout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogoutDialog: () => dispatch({ type: SHOW_LOGOUT }),
    hideLogoutDialog: () => dispatch({ type: HIDE_LOGOUT }),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LogoutDialog)
