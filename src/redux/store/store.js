import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";

import loginPageReducer from "../slices/uiSlice/loginPage";
import commonUiReducer from "../slices/uiSlice/common";
import { combineReducers } from "redux";

const store = configureStore({
    reducer: {


        userState: userReducer,

        newUiState: combineReducers({
            loginPage: loginPageReducer,
            commonUi: commonUiReducer,
        })
    }
});

export default store;