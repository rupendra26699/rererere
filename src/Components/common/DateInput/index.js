import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

const DateInput = (props) => {
  const { value, name, submitError, formState } = props;
  const [errorMsg, setErrorMsg] = useState(null);
  const { formData, setFormData } = formState;

  const handleOnChange = (date) => {
    const formDataCopy = { ...formData };
    formDataCopy[name].value = date;
    formDataCopy[name].errorMsg = null;
    setFormData(formDataCopy);
  };

  return (
    <>
      <DatePicker
        className={clsx({
          "w-[96.5%] my-[10px] mx-0 pt-[9px] pb-[9px] pl-[14px] pr-[14px] border bg-calender bg-2 bg-no-repeat  bg-[center_right_15px]  border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px] text-inputFieldText": true,
          "border-inputFieldErrorBorderColor": errorMsg || submitError,
          "bg-inputDisabledBackgroundColor": formData[name].disabled,
        })}
        value={value}
        dateFormat="dd/MMM/yyyy"
        placeholderText={formData[name].placeholder}
        onChange={(date) => handleOnChange(date)}
        selected={formData[name].value}
        disabled={formData[name].disabled ? "disabled" : ""}
        {...props}
      />
      {(submitError || errorMsg) && (
        <p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">
          {submitError || errorMsg}
        </p>
      )}
    </>
  );
};

export default DateInput;
