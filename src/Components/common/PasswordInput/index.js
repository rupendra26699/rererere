import React, { Fragment, useState } from "react";
import { validateInput } from "../../../Helpers/validation";
import clsx from "clsx";

const PasswordInput = (props) => {
  const { value, validateAs, submitError, formState, name } = props;
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleOnChange = (e) => {
    const { formData, setFormData } = formState;
    const formDataCopy = { ...formData };
    formDataCopy[name].value = e.target.value;
    formDataCopy[name].errorMsg = null;
    setFormData(formDataCopy);

    const error = validateInput(validateAs, e.target.value);
    if (error) setErrorMsg(error);
    else setErrorMsg(null);
    return;
  };

  return (
    <Fragment>
      <input
        type={showPass ? "text" : "password"}
        // className={`form-input form-password ${
        //   (errorMsg || submitError) && "error"
        // }`}
        className={clsx({
          "w-[96.5%] my-[10px] mx-0 pt-[9px] pb-[9px] pl-[14px] bg-white border border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px]  text-inputFieldText": true,
          "border-inputFieldErrorBorderColor": errorMsg || submitError,
          // "bg-inputDisabledBackgroundColor": formData[name].disabled,
        })}
        value={value}
        onChange={(e) => handleOnChange(e)}
        name="password"
        {...props}
      />
      <button className="bg-passwordEye bg-no-repeat h-[20px] w-[24px] absolute top-[48px] right-[25px]" onClick={() => setShowPass(!showPass)} />
      {(submitError || errorMsg) && (
        <p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">
          {submitError || errorMsg}
        </p>
      )}
    </Fragment>
  );
};

export default PasswordInput;
