import { useSelect } from "downshift";
import clsx from "clsx";
import { useController } from "react-hook-form";

// TODO set items to be a dynamic value

const ITEMS = [];

function ControlledSelectBox({
	optionsLoaded,
	control,
	name,
	label,
	selectLabel,
	items = ITEMS,
	disabled,
	defaultValue = "",
	errors,
	itemToString = (item) => (item ? String(item) : ""),
	itemsToDisplayValue = (item) => (item ? String(item) : "")
}) {

	const itemValueToitemDisplayValueMapping = {}

	for (let item of items) {

		itemValueToitemDisplayValueMapping[itemToString(item)] = itemsToDisplayValue(item)

	}

	// name renamed to fieldName
	const {
		//  field: { onChange, onBlur, name: fieldName, value, ref },
		// As the value of name remains same we do not need to extract it from field ! ??
		field: { onChange, onBlur, value, ref },
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields },
	} = useController({
		name,
		control,

		defaultValue,
	});

	const {
		isOpen,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
	} = useSelect({
		items,
		itemToString,
		selectedItem: value,
		onSelectedItemChange: (changedState) => {
			onChange(itemToString(changedState.selectedItem));
		},
	});



	return (
		<div className="min-w-[150px] flex flex-col items-stretch pr-[10px]">
			{label && (
				<label
					{...getLabelProps()}
					className="text-left font-primary font-semibold text-textlight text-sm">
					{label}
				</label>
			)}
			<div className="relative flex flex-col items-stretch">
				<button
					className={clsx({
						"block  mt-[10px] mx-0 5 pt-[9px] pb-[9px] pl-[14px] pr-[14px] border bg-selectBackground bg-selectBox bg-1 bg-[center_right_15px] bg-no-repeat appearance-none  border-inputComponentBorderColor rounded-[4px] text-[14px] leading-[17px] text-left text-inputFieldText": true,
						"border-inputFieldErrorBorderColor": !!error,
						"bg-inputDisabledBackgroundColor": !!disabled,
					})}
					type="button"
					{...getToggleButtonProps()}>

					{value ? itemValueToitemDisplayValueMapping[value] : selectLabel}


				</button>
				<ul
					className="  z-30 absolute top-[105%] my-[-8px]  max-h-[400px] overflow-auto left-0 right-0"
					{...getMenuProps()}>
					{isOpen &&
						items.map((item, index) => (
							<li
								className={clsx({
									"z-30 w-full py-[7px] px-[12px] border-x border-b cursor-pointer shadow-lg": true,
									" border-t": index === 0,
									"bg-selectOptionSelectedBackground":
										highlightedIndex === index,
									"bg-selectOptionBackground": highlightedIndex !== index,
								})}
								key={`${item}${index}`}
								{...getItemProps({ item, index })}>
								{itemsToDisplayValue(item)}
							</li>

						))}
				</ul>
			</div>

			{!!errors[name] && (
				<p className="text-left  m-0 mt-[10px] text-[14px] leading-[17px] text-inputFieldErrorMessageColor ">
					{


						error.message}
				</p>
			)}
		</div>
	);
}

export default ControlledSelectBox;

