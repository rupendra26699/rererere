import React from "react";
import close from "../../../Assets/images/close.svg";

const CustomModal = (props) => {
	const { show, onClose, modalComponent, title, size } = props;
	if (!show) return null;
	return (
		<div className="fixed top-0 left-0 w-[100%] h-[100%] bg-modalBackground z-[999]">
			<section className={`absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[2%] ${size}`}>
				<div className="flex justify-between mb-5">
					<p className="text-left font-primary font-bold text-lg">{title}</p>
					<img src={close} alt="" className="hover:cursor-pointer" onClick={() => onClose()} />
				</div>
				<div className="overflow-auto h-[90%]">{modalComponent}</div>
			</section>
		</div>
	);
};

export default CustomModal;
