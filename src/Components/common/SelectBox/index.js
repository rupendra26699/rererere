import React, { useState } from "react";
import clsx from "clsx";

const SelectBox = (props) => {
  const { submitError, formState, name } = props;
  const [errorMsg, setErrorMsg] = useState(null);
  const { formData, setFormData } = formState;
  const { options } = formData[name];

  const handleOnChange = (e) => {
    const formDataCopy = { ...formData };
    formDataCopy[name].value = e.target.value;
    formDataCopy[name].errorMsg = null;
    setFormData(formDataCopy);
    return;
  };

  return (
    <>
      <select
        className={clsx({
          "w-[96.5%] my-[10px] mx-0 mr-5 pt-[9px] pb-[9px] pl-[14px] pr-[14px] border bg-selectBox bg-1 bg-[center_right_15px] bg-no-repeat appearance-none  border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px] text-inputFieldText": true,
          "border-inputFieldErrorBorderColor": errorMsg || submitError,
          "bg-inputDisabledBackgroundColor": formData[name].disabled,
        })}
        onChange={(e) => handleOnChange(e)}
        name={name}
        disabled={formData[name].disabled ? "disabled" : ""}
        {...props}
      >
        <option value="">{formData[name].placeholder}</option>
        {Array.isArray(options) &&
          options.length > 0 &&
          options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {(submitError || errorMsg) && (
        <p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">
          {submitError || errorMsg}
        </p>
      )}
    </>
  );
};

export default SelectBox;
