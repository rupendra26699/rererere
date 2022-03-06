import { createSlice } from "@reduxjs/toolkit";
import apiCaller from "../../Axios/apiCaller";
import { LOGIN_URL } from "../../Constants/apiConstants";
import { requestInProgress, requestOver, showFormError, hideFormError, setFormErrorMessage } from "./uiSlice/loginPage";

const initialState = {
    isLoggedIn: false,
    token: undefined,
    role: undefined,
    employeeId: undefined,
    email: undefined,


};






export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.loginToken
            state.employeeId = action.payload.employeeId;
            state.email = action.payload.email;

        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = undefined;
            state.employeeId = undefined;
            state.email = undefined;
        }

    }
})





export const { login: loginAction, logout: logoutAction } = userSlice.actions;






export const loginThunk = (userName, password) => {

    return async (dispatch, getState) => {
        dispatch(requestInProgress())
        try {
            let returnValue = await apiCaller.post(LOGIN_URL, {
                userName,
                password
            })
            dispatch(requestOver())
            if (returnValue?.status === 200 && returnValue?.data?.hasOwnProperty('employeeId')) {
                dispatch(hideFormError());
                dispatch(loginAction({
                    ...returnValue.data
                }));
                return "login_user";
            }
            //Handle other cases
            else throw (new Error("response with undefined format returned"))



        }
        catch (error) {
            dispatch(requestOver());
            if (error?.response?.status === 401 && error?.response?.data?.status?.toLowerCase() === "fail") {
                // 
                //    dispatch(logoutAction()) ;
                //       dispatch(showFormError(true));

            }

            dispatch(logoutAction())
            dispatch(showFormError(true));
            dispatch(setFormErrorMessage("Login Failed"))
        }

    }
}

export default userSlice.reducer;