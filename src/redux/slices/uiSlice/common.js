
import { createReducer, createAction } from "@reduxjs/toolkit";


export const showLogoutPopup = createAction("common/showLogoutPopup");
export const hideLogoutPopup = createAction("common/hideLogoutPopup");
export const showNavigationSidebar = createAction("common/showNavigationSidebar");
export const hideNavigationSidebar = createAction("common/hideNavigationSidebar");


const initialState = {
    showNavigationSidebar: true,
    showLogoutPopup: false,
}


const commonUiReducer = createReducer(initialState, (builder) => {
    builder.addCase(showLogoutPopup, (state, action) => {
        state.showLogoutPopup = true;
    });

    builder.addCase(hideLogoutPopup, (state, action) => {
        state.showLogoutPopup = false;
    })

    builder.addCase(showNavigationSidebar, (state, action) => {
        state.showNavigationSidebar = true;
    });

    builder.addCase(hideNavigationSidebar, (state, action) => {
        state.showNavigationSidebar = false

    })


})

export default commonUiReducer;