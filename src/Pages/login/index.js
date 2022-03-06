import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import logo from "../../Assets/images/logo.svg";
// TODO Refactor fileNames to use Input Component
import Input from "../../Components/common/NewInput";
// TODO Refactor fileNames to use Password Component
import PasswordInput from "../../Components/common/NewPasswordInput";
import { loginThunk } from "../../redux/slices/userSlice";
// TODO Refactor LoadingIndicator to use pure css 
import LoadingIndicator from "../../Components/common/LoadingIndicator";
import clsx from "clsx";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


let showFormDevTool = true;

const schema = yup.object({

    // TODO validate userName for it either being a valid email or an employeeId
    userName: yup.string().required("This field is required ").email("Please enter a valid email "),
    password: yup.string().min(8, "Password must be of 8 characters ")

})

const Login = () => {

    const { register, handleSubmit, formState, control } = useForm({

        resolver: yupResolver(schema)
    });

    const showFormError = useSelector(
        (state) => state.newUiState.loginPage.showFormError
    );
    const formErrorMessage = useSelector(
        (state) => state.newUiState.loginPage.formErrorMessage
    );
    const requestInProgress = useSelector(
        (state) => state.newUiState.loginPage.requestInProgress
    );
    const userLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const dispatch = useDispatch();

    const onSubmitSuccess = (data, event) => {
        //handle form submission ;
        dispatch(loginThunk(data.userName, data.password))

    }
    const { errors } = formState;


    if (userLoggedIn) return <Navigate to="/projects" />;

    return (
        <form onSubmit={handleSubmit(onSubmitSuccess)} className=" flex justify-between  bg-homePage h-[100vh] px-[20px]">
            {requestInProgress && <LoadingIndicator />}
            <div className="flex justify-center items-center p-[40px]">
                <div className="pr-[190px]">
                    <h1 className="font-primary font-bold text-[54px] leading-[74px] text-primary tracking-normal">
                        Igniting technology. Inspiring possibilities.
                    </h1>
                    <h2 className="align-left font-light text-white text-[30px] leading-[30px] font-primary">
                        Enterprise solutions and services for government and commercial
                        markets.
                    </h2>
                </div>
            </div>
            <div className="flex justify-center items-center p-[40px]">
                <div className="py-[30px]  px-[30px] bg-zinc-50 border border-zinc-100 rounded-[16px] w-[490px] h-[585px] box-content">
                    <div className="text-[#636060] text-[30px] flex justify-center">
                        <object data={logo} width="240" height="70" />
                    </div>
                    <div className="mt-[25px]  mb-[30px]">
                        <h3 className="align-left font-bold text-[24px] leading-[29px] text-[#191919] mb-[10px]">
                            Sign In
                        </h3>
                        <p className="align-left font-normal text-[16px] leading-[13px] text-[#767676]">
                            Welcome back! Please login to your account.
                        </p>
                    </div>
                    {showFormError && (
                        <div className=" flex justify-center text-[16px] font-bold text-errorRed">{formErrorMessage}</div>
                    )}

                    <div>
                        <div className="my-[20px] relative">
                            <label className="align-left font-bold text-[14px] leading-[17px] ">
                                Email Address / Employee ID
                            </label>
                            <Input
                                type="text"

                                {...register("userName")}
                                errors={errors}

                            />
                        </div>
                        <div className="my-[20px] relative">
                            <label className="align-left font-bold text-[14px] leading-[17px]">
                                Password
                            </label>
                            <PasswordInput


                                {...register("password")}
                                errors={errors}

                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="relative my-6">
                                <input
                                    type="checkbox"
                                    className="w-[20px] h-[22px] align-bottom"
                                    id="remember_check"
                                    name="checkbox"

                                />
                                <label className="align-left font-primary mx-3" for="remember_check">
                                    Remember me
                                </label>
                            </div>
                            <div className="relative my-[20px]">
                                <a href="javascript:void(0)" className="align-right text-linkColor">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`${clsx({
                                "h-[50px] w-full shadow-sm bg-primary rounded-[25px] border-0 font-bold text-[16px] leading-[19px]": true,
                                "opacity-30": requestInProgress,
                            })}`}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            {showFormDevTool && (process.env.NODE_ENV === "development") && <DevTool control={control} />}
        </form >
    );
};

export default Login;
