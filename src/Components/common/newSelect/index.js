import React, { useState } from "react";
import clsx from "clsx";

const SelectBox = React.forwardRef(
  (
    {
      type,
      onChange,
      onBlur,
      value,
      name,
      errors,
      variant = "thin",
      disabled = false,
    },
    ref
  ) => {
    const options = value;

    return (
      <>
        <select
          className={clsx({
            "w-[96.5%] my-[10px] mx-0 mr-5 pt-[9px] pb-[9px] pl-[14px] pr-[14px] border bg-selectBox bg-1 bg-[center_right_15px] bg-no-repeat appearance-none  border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px] text-inputFieldText": true,
            "border-inputFieldErrorBorderColor": !!errors[name],
            "bg-inputDisabledBackgroundColor": disabled,
            "py-[14px]": variant === "thick",
            "py-[9px]": variant === "thin",
          })}
          onChange={onChange}
          name={name}
          disabled={disabled}
          ref={ref}
        >
          <option value="">Select</option>
          {Array.isArray(options) &&
            options.length > 0 &&
            options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        {errors[name] && (
          <p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">
            {errors[name]?.message}
          </p>
        )}
      </>
    );
  }
);

export default SelectBox;
