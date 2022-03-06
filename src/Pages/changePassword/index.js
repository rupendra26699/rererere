import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/images/logo.svg";
import PasswordInput from "../../Components/common/PasswordInput";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: {
      name: "password",
      value: "",
      errorMsg: null,
      required: true,
    },
    newPassword: {
      name: "newPassword",
      value: "",
      errorMsg: null,
      required: true,
    },
    confirmNewPassword: {
      name: "confirmNewPassword",
      value: "",
      errorMsg: null,
      required: true,
    },
  });

  const history = useNavigate();

  const onSubmitHandler = (e) => {
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
    if (formData.newPassword.value !== formData.confirmNewPassword.value) {
      isError = true;
      formDataCopy.confirmNewPassword.errorMsg =
        "New Password and Confirm New Password should be same";
      formDataCopy.newPassword.errorMsg =
        "New Password and Confirm New Password should be same";
    }

    if (isError) {
      setFormData(formDataCopy);
      return;
    } else {
      history("/")
    }
  };

  return (
    <div className="flex justify-between  bg-homePage h-[100vh] px-[20px]">
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
        <div className="py-[20px]  px-[30px] bg-zinc-50 border border-zinc-100 rounded-[16px] w-[490px] h-[565px] box-content">
          <div className="text-[#636060] text-[30px] flex justify-center">
            <object data={logo} width="240" height="70" />
          </div>
          <div className="mt-5 mb-5">
            <h3 className="align-left font-bold text-[24px] leading-[29px] text-[#191919] mb-[10px]">
              Change Password
            </h3>
            <p className="align-left font-normal text-[16px] leading-[13px] text-[#767676]">
              Your new password must be different from previous password.
            </p>
          </div>
          <div className="login-form">
            <div className="relative mb-2">
              <label className="align-left font-bold font-primary text-textlight text-[14px] leading-[17px]">
                Old password
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
            <div className="relative mb-2">
              <label className="align-left font-bold font-primary text-textlight text-[14px] leading-[17px]">
                New Password
              </label>
              <PasswordInput
                value={formData.newPassword.value}
                formState={{ formData, setFormData }}
                name="newPassword"
                validateAs="password"
                maxLength="25"
                submitError={formData.newPassword.errorMsg}
              />
            </div>
            <div className="relative mb-5">
              <label className="align-left font-bold font-primary text-textlight text-[14px] leading-[17px]">
                Confirm New Password
              </label>
              <PasswordInput
                value={formData.confirmNewPassword.value}
                formState={{ formData, setFormData }}
                name="confirmNewPassword"
                validateAs="password"
                maxLength="25"
                submitError={formData.confirmNewPassword.errorMsg}
              />
            </div>

            <button
              type="button"
              className="h-[50px] w-[470px] text-white mx-1 shadow-sm bg-primary rounded-[25px] border-0 font-bold text-[16px] leading-[19px]"
              onClick={() => onSubmitHandler()}
            >
              Continue
            </button>
            <div className="flex justify-center mt-5">
              <a
                className="text-fileuploadButton font-primary font-normal text-sm leading-[17px]"
                href="/"
              >
                Back{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
