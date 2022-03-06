import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { useController } from "react-hook-form";
import { format, parse } from 'date-fns'


const DateInput = ({ name, control, disabled = false, placeholder = "DD/MMM/YYYY", defaultValue }) => {




    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState: { touchedFields, dirtyFields, errors }
    } = useController({
        name, control, defaultValue
    })



    const dateValue = value === undefined ? undefined : parse(value, 'yyyy-MM-dd', new Date());


    const onDatePickerValueChanged = (value) => {
        let formatted_value = format(value, "yyyy-MM-dd")
        onChange(formatted_value)

    }


    return (
        <div className="pr-[10px] flex flex-col items-stretch">
            <DatePicker
                className={clsx({
                    "w-full mr-[10px] my-[10px] ml-0 pt-[9px] pb-[9px] pl-[14px] pr-[14px] border bg-calender bg-2 bg-no-repeat  bg-[center_right_15px]  border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px] text-inputFieldText": true,
                    "border-inputFieldErrorBorderColor": !!errors[name],
                    "bg-inputDisabledBackgroundColor": disabled,
                })}
                selected={dateValue}
                dateFormat="dd/MMM/yyyy"
                placeholderText={placeholder}
                disabled={disabled}
                onChange={onDatePickerValueChanged}


            />
            {(!!errors[name]) && (
                <p className="text-left m-0 mr-[10px] text-[14px] leading-[17px] text-inputFieldErrorMessageColor ">
                    {error.message}
                </p>
            )}
        </div>
    );


}

export default DateInput
/*

const DateInput = ({ name, control, disabled = false, placeholder = "DD/MMM/YYYY" }) => {

    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState: { touchedFields, dirtyFields, errors }
    } = useController({
        name, control,
    })


    const datePickerValueChanged = (value) => {
        onChange(format(value, "yyyy-MM-dd"))
    }




    return (
        <div className="pr-[10px] flex flex-col items-stretch">
            <DatePicker
                className={clsx({
                    "w-full mr-[10px] my-[10px] ml-0 pt-[9px] pb-[9px] pl-[14px] pr-[14px] border bg-calender bg-2 bg-no-repeat  bg-[center_right_15px]  border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px] text-inputFieldText": true,
                    "border-inputFieldErrorBorderColor": !!errors[name],
                    "bg-inputDisabledBackgroundColor": disabled,
                })}
                selected={value}
                dateFormat="dd/MMM/yyyy"
                placeholderText={placeholder}
                disabled={disabled}
                onChange={datePickerValueChanged}


            />
            {(!!errors[name]) && (
                <p className="text-left m-0 mr-[10px] text-[14px] leading-[17px] text-inputFieldErrorMessageColor ">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default DateInput;



*/