import React, { useState } from "react";
import logo from "../../Assets/images/logo.svg";
import PasswordInput from "../../Components/common/PasswordInput";

const Reset = () => {
  
  const [formData, setFormData] = useState({
    password: {
      name: "password",
      value: "",
      errorMsg: null,
      required: true,
    },
    conPassword: {
      name: "password",
      value: "",
      errorMsg: null,
      required: true,
    },
  });
  const [matchPass, setMatchPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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

    if (
      formData.password.value === formData.conPassword.value &&
      isError === false
    ) {
      setMatchPass(true);
    } else {
      isError = true;
      formDataCopy.conPassword.errorMsg =
        "New and confirm new password should be same";
      formDataCopy.password.errorMsg =
        "New and confirm new password should be same";
    }
    if (isError) {
      setFormData(formDataCopy);
      return;
    }
  };

  return (
    <div className="flex justify-between  bg-homePage h-[100vh] px-[20px]">
      <div className="flex justify-center items-center p-[40px]">
        <div className="content-wrap">
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
          <div className="mt-5 mb-10">
            <h3 className="align-left font-bold text-[24px] leading-[29px] text-[#191919] mb-[10px]">Reset Your Password</h3>
            <p className="align-left font-normal text-[16px] leading-[13px] text-[#767676]">
              {matchPass ? (
                <span>
                  We have sent a reset password email to <br></br>{" "}
                  <b>super.admin@inadev.com</b> <br></br> Please click the reset
                  password link to set your new password. <br></br> Didn’t
                  receive the email yet? <br></br> Please check your spam
                  folder, or <a href="#">resend</a> the email.
                </span>
              ) : (
                "Create a new password to continue"
              )}
            </p>
          </div>
          {matchPass ? (
            ""
          ) : (
            <div className="login-form">
              <div className="relative mb-5">
                <label className="align-left font-bold font-primary text-textlight text-[14px] leading-[17px]">New Password</label>
                <PasswordInput
                  value={formData.password.value}
                  formState={{ formData, setFormData }}
                  name="password"
                  validateAs="password"
                  maxLength="25"
                  submitError={formData.password.errorMsg}
                />
              </div>
              <div className="relative mb-5">
                <label className="align-left font-bold font-primary text-textlight text-[14px] leading-[17px]"> Confirm New Password</label>
                <PasswordInput
                  value={formData.conPassword.value}
                  formState={{ formData, setFormData }}
                  name="conPassword"
                  validateAs="password"
                  maxLength="25"
                  submitError={formData.conPassword.errorMsg}
                />
              </div>

              <button
                type="button"
              className="h-[50px] w-[470px] text-white mx-1 shadow-sm bg-primary rounded-[25px] border-0 font-bold text-[16px] leading-[19px]"
                onClick={(e) => handleSubmit(e)}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reset;
