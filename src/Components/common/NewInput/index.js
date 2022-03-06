import React, { Fragment, useState } from "react";

import clsx from "clsx";

const Input = React.forwardRef(
	(
		{
			type,
			onChange,
			onBlur,
			name,
			errors,
			variant = "thin",
			disabled = false,
			placeholder,
			readonly
		},
		ref
	) => {
		return (

			<div className="flex flex-col items-stretch pr-[10px]">
				<input
					type={type}
					name={name}
					readOnly={readonly}
					// className={`form-input${errorMsg || submitError ? " error" : ""}${formData[name].disabled ? " disabled" : ""}`}
					className={clsx({
						" my-[10px] mx-0 pt-[9px] pb-[9px] pl-[14px] bg-white border border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px]  text-inputFieldText": true,
						"border-inputFieldErrorBorderColor": !!errors[name],
						"bg-inputDisabledBackgroundColor": disabled,
						"py-[14px]": variant === "thick",
						"py-[9px]": variant === "thin",
					})}
					placeholder={placeholder}
					disabled={disabled}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
				/>
				{errors[name] && (
					<p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor ">
						{errors[name]?.message}
					</p>
				)}
			</div>

		);
	}
);

export default Input;
