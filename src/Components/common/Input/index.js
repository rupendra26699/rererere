import React, { Fragment, useState } from "react";
import { validateInput } from "../../../Helpers/validation";
import clsx from "clsx";
const Input = (props) => {
  const { type, value, name, validateAs, submitError, formState} = props;
  const [errorMsg, setErrorMsg] = useState(null);
  const { formData, setFormData } = formState;

  const handleOnChange = (e) => {
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
        type={type}
        name={name}
        // className={`form-input${errorMsg || submitError ? " error" : ""}${formData[name].disabled ? " disabled" : ""}`}
        className={
         clsx({
            "w-[96.5%] my-[10px] mx-0 pt-[9px] pb-[9px] pl-[14px] bg-white border border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px]  text-inputFieldText": true,
            "border-inputFieldErrorBorderColor": (errorMsg || submitError),
            "bg-inputDisabledBackgroundColor": formData[name].disabled,
          })
        }
        placeholder={formData[name].placeholder}
        value={value}
        onChange={(e) => handleOnChange(e)}
        disabled={formData[name].disabled ? "disabled" : ""}
        {...props}
      />
      {(submitError || errorMsg) && (
        <p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">{submitError || errorMsg}</p>
      )}
    </Fragment>
  );
};

export default Input;
