import React, { Fragment, useState } from "react";
import { validateInput } from "../../../Helpers/validation";
import clsx from "clsx";

const PasswordInput = React.forwardRef(({ name, onChange, onBlur, errors, variant = "thin", disabled = false }, ref) => {
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="  ">
            <input
                type={showPass ? "text" : "password"}

                className={clsx({
                    "  bg-white border border-inputComponentBorderColor rounded-[4px] items-center  my-[10px] mx-0 w-[96.5%]  pl-[14px]  text-[14px] leading-[17px]  text-inputFieldText": true,
                    "border-inputFieldErrorBorderColor": errors?.[name],
                    "bg-inputDisabledBackgroundColor": false,
                    "pt-[14px] pb-[17px]": variant === "thick",
                    "pt-[9px] pb-[11px]": variant === "thin"
                })}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />
            <button type="button"

                className={
                    clsx({
                        "bg-passwordEye mt-[5px] bg-no-repeat h-[20px] absolute w-[24px]   right-[25px]": true,
                        "top-[43px]": variant === "thin",
                        "top-[49px]": variant === "thick"
                    })
                }
                onClick={() => setShowPass(!showPass)} />
            {(errors[name]) && (
                <p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">{errors[name]?.message}</p>
            )}
        </div >
    )
}

);




export default PasswordInput;
