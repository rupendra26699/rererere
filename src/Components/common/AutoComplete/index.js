import clsx from "clsx";
import React, { useState } from "react";
import { validateInput } from "../../../Helpers/validation";

const AutoComplete = (props) => {
	const { value, name, validateAs, submitError, formState, suggestions } =
		props;
	const [errorMsg, setErrorMsg] = useState(null);
	const { formData, setFormData } = formState;

	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

	const handleOnChange = (e) => {
		const formDataCopy = { ...formData };

		formDataCopy[name].value = e.target.value;
		formDataCopy[name].errorMsg = null;
		setFormData(formDataCopy);
		setFilteredSuggestions(suggestions);
		setActiveSuggestionIndex(0);

		const error = validateInput(validateAs, e.target.value);
		if (error) setErrorMsg(error);
		else setErrorMsg(null);
		return;
	};

	const handleOnClick = (suggestion) => {
		const formDataCopy = { ...formData };
		setFilteredSuggestions([]);
		formDataCopy[name].value = suggestion;
		formDataCopy[name].errorMsg = null;
		setFormData(formDataCopy);
		setActiveSuggestionIndex(0);
	};

	return (
		<div className="relative">
			<input
				type="text"
				name={name}
				// className={`form-input autocomplete${
				//   errorMsg || submitError ? " error" : ""
				// }${formData[name].disabled ? " disabled" : ""}`}
				className={clsx({
					"w-[96.5%] my-[10px] mx-0 pt-[9px] pb-[9px] pl-[14px] bg-white border border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px]  text-inputFieldText": true,
					"border-inputFieldErrorBorderColor": errorMsg || submitError,
					"bg-inputDisabledBackgroundColor": formData[name].disabled,
				})}
				placeholder={formData[name].placeholder}
				value={formData[name].value || ""}
				onChange={(e) => handleOnChange(e)}
				onClick={() => setFilteredSuggestions([])}
				{...props}
			/>
			{filteredSuggestions.length > 0 && (
				<ul class="suggestions">
					{filteredSuggestions.map((suggestion, index) => {
						let className;
						// Flag the active suggestion with a class
						if (index === activeSuggestionIndex) {
							className = "suggestion-active";
						}
						return (
							<li
								className={className}
								key={suggestion}
								onClick={() => handleOnClick(suggestion)}>
								{suggestion}
							</li>
						);
					})}
				</ul>
			)}
			{(submitError || errorMsg) && (
				<p className="text-left m-0 text-[14px] leading-[17px] text-inputFieldErrorMessageColor w-[96.5%]">
					{submitError || errorMsg}
				</p>
			)}
		</div>
	);
};

export default AutoComplete;
