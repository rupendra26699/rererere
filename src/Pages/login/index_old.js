import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, } from "react-router-dom";

import logo from "../../Assets/images/logo.svg";

import Input from "../../Components/common/Input";
import PasswordInput from "../../Components/common/PasswordInput";
import { loginThunk } from "../../redux/slices/userSlice";
import LoadingIndicator from "../../Components/common/LoadingIndicator";
import clsx from "clsx";

import "./login.css";

let showFormDevTool = true;

const Login = () => {
  // const history = useNavigate();



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

  const [formData, setFormData] = useState({
    username: {
      name: "username",
      value: "",
      errorMsg: null,
      required: true,
    },
    password: {
      name: "password",
      value: "",
      errorMsg: null,
      required: true,
    },
  });
  const [checkVal, setCheckVal] = useState(false);

  const handleSubmit = async () => {
    const formDataCopy = { ...formData };
    let isError = false;
    Object.keys(formDataCopy).every((inputName) => {
      if (
        formDataCopy[inputName].required &&
        formDataCopy[inputName].value === ""
      ) {
        formDataCopy[inputName].errorMsg = "This field is required";
        isError = true;
        return false;
      } else return true;
    });

    if (isError) {
      setFormData(formDataCopy);
      return;
    }

    let returnValue = dispatch(
      loginThunk(formDataCopy["username"].value, formDataCopy["password"].value)
    );

    // history("/projects");
    // form submit code
  };
  if (userLoggedIn) return <Navigate to="/projects" />;

  // if user is not logged
  return (
    <div className=" flex justify-between  bg-homePage h-[100vh] px-[20px]">
      {requestInProgress && <LoadingIndicator />}
      <div className="flex justify-center items-center p-[40px]">
        <div>
          <h1 className="font-primary font-bold text-[54px] leading-[74px] text-primary tracking-normal mb-3">
            Igniting technology. Inspiring possibilities.
          </h1>
          <h2 className="align-left font-light text-white text-[24px] leading-[34px] font-primary">
            Enterprise solutions and services for government and commercial
            markets.
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center p-[40px]">
        <div className="py-[30px]  px-[30px] bg-zinc-50 border border-zinc-100 rounded-[16px] w-[490px] h-[550px] box-content">
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
            <div className="login-fail">{formErrorMessage}</div>
          )}

          <div>
            <div className="my-[20px] relative">
              <label className="align-left font-bold font-primary text-textlight text-[14px] leading-[17px] ">
                Email Address / Employee ID
              </label>
              <Input
                type="text"
                name="username"
                value={formData.username.value}
                formState={{ formData, setFormData }}
                validateAs="email"
                maxLength="100"
                submitError={formData.username.errorMsg}
              />
            </div>
            <div className="my-[20px] relative">
              <label className="align-left font-bold text-[14px] font-primary text-textlight leading-[17px]">
                Password
              </label>
              <PasswordInput
                value={formData.password.value}
                formState={{ formData, setFormData }}
                name="password"
                validateAs="password"
                maxLength="25"
                submitError={formData.password.errorMsg}
              />
            </div>
            <div className="flex justify-between items-center mb-5 mr-5">
              <div className="relative my-2">
                <input
                  type="checkbox"
                  className="w-[20px] h-[20px] align-bottom"
                  id="remember_check"
                  name="checkbox"
                  value={checkVal}
                  onChange={(e) => setCheckVal(e.target.checked)}
                />
                <label className="align-left font-primary font-normal text-sm leading-6 mx-3" for="remember_check">
                  Remember me
                </label>
              </div>
              <div className="relative my-3">
                <a href="javascript:void(0)" className="align-right font-primary font-normal text-sm text-linkColor leading-4">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="button"
              className={`${clsx({
                "h-[50px] w-[470px] text-white mx-1 shadow-sm bg-primary rounded-[25px] border-0 font-bold text-[16px] leading-[19px]": true,
                "btn-disabled": requestInProgress,
              })}`}
              onClick={() => handleSubmit()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {/*showFormDevTool && (process.env.NODE_ENV === "development") && < DevTool control={control } /> */}
    </div>
  );
};

export default Login;
