
import { createReducer, createAction } from "@reduxjs/toolkit";



export const requestInProgress = createAction("loginPage/requestInProgress");
export const requestOver = createAction("loginPage/requestOver");
export const showFormError = createAction("loginPage/showFormError");
export const hideFormError = createAction("loginPage/hideFormError");
export const setFormErrorMessage = createAction("loginPage/setFormErrorMessage");


export const initialState = {
    requestInProgress: false,
    showFormError: false,
    formErrorMessage: "",
}


const loginPageReducer = createReducer(initialState, (builder) => {
    builder.addCase(requestInProgress, (state, action) => {
        state.requestInProgress = true;
    });
    builder.addCase(requestOver, (state, action) => {
        state.requestInProgress = false;
    })
    builder.addCase(showFormError, (state, action) => {
        state.showFormError = true;
    });

    builder.addCase(hideFormError, (state, action) => {
        state.showFormError = false;
    })
    builder.addCase(setFormErrorMessage, (state, action) => {
        state.formErrorMessage = action.payload;
    })
})

export default loginPageReducer;

