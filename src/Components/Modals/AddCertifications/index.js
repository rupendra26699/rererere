import React, { useState } from "react";
import trash from "../../../Assets/images/trash.svg";
import DateInput from "../../common/DateInput";
import FileBrowser from "../../common/FileBrowser";
import Input from "../../common/Input";

const AddCertifications = (props) => {
	const initialForm = {
		certificate_1: {
			certi_name: {
				name: "certi_name",
				value: "",
				errorMsg: null,
				required: true,
				placeholder: "Enter Certificate Name",
			},
			org_name: {
				name: "org_name",
				value: "",
				errorMsg: null,
				required: true,
				placeholder: "Enter Organisation Name",
			},
			certi_date: {
				name: "certi_date",
				value: "",
				errorMsg: null,
				required: true,
				placeholder: "DD/MMM/YYYY",
			},
			grade: {
				name: "grade",
				value: "",
				errorMsg: null,
				placeholder: "0",
			},
			upload_certi: {
				name: "upload_certi",
				value: "",
				errorMsg: null,
				required: true,
				placeholder: "No file chosen",
			},
		},
	};

	const [formData, setFormData] = useState(initialForm);
	const handleInputChange = (data, certificate) => {
		let formDataCopy = { ...formData };
		formDataCopy[certificate] = { ...data };
		setFormData(formDataCopy);
	};
	
	const handleAddCertificate = () => {
		let formDataCopy = { ...formData };
		const lastIndex = Object.keys(formDataCopy).length + 1;
		const name = `certificate_${lastIndex}`;
		formDataCopy[name] = { ...initialForm.certificate_1 };
		setFormData(formDataCopy);
	};
	const handleRemoveCertificate = (name) => {
		const formDataCopy = { ...formData };
		delete formDataCopy[name];
		setFormData(formDataCopy);
	};

	return (
		<div className="">
			{formData &&
				Object.keys(formData).map((certificate, idx) => (
					<div key={idx} className="skill-content mb-20">
						{idx > 0 && (
							<div
								className="skill-del-btn"
								onClick={() => handleRemoveCertificate(certificate)}>
								<img src={trash} width="10" />
							</div>
						)}
						<div className="mb-20">
							<div className="w-100">
								<label className="form-label">Certificate Name*</label>
								<Input
									type="text"
									name={formData[certificate].certi_name.name}
									value={formData[certificate].certi_name.value}
									formState={{
										formData: formData[certificate],
										setFormData: (data) => handleInputChange(data, certificate),
									}}
									submitError={formData[certificate].certi_name.errorMsg}
								/>
							</div>
							<div className="w-100">
								<label className="form-label">Organisation Name*</label>
								<Input
									type="text"
									name={formData[certificate].org_name.name}
									value={formData[certificate].org_name.value}
									formState={{
										formData: formData[certificate],
										setFormData: (data) => handleInputChange(data, certificate),
									}}
									submitError={formData[certificate].org_name.errorMsg}
								/>
							</div>
							<div className="flexbox" style={{ width: "98%" }}>
								<div className="half-input mr-20">
									<label className="form-label">Certificate Date*</label>
									<DateInput
										name={formData[certificate].certi_date.name}
										value={formData[certificate].certi_date.value}
										formState={{
											formData: formData[certificate],
											setFormData: (data) =>
												handleInputChange(data, certificate),
										}}
										submitError={formData[certificate].certi_date.errorMsg}
									/>
								</div>
								<div className="half-input">
									<label className="form-label">Grade/Percentage</label>
									<Input
										type="text"
										name={formData[certificate].grade.name}
										value={formData[certificate].grade.value}
										formState={{
											formData: formData[certificate],
											setFormData: (data) =>
												handleInputChange(data, certificate),
										}}
										submitError={formData[certificate].grade.errorMsg}
									/>
								</div>
							</div>
							<div style={{ width: "101%" }}>
								<label className="form-label">Upload Certificate*</label>
								<FileBrowser
									id="uploadresume"
									label="fileuploader"
									span="file-chosen"
									className="fileBrowser"
									text="Size of Certificate should not be more than 2MB. You may upload JPG, JPEG, PNG"
									accept="image/jpeg,image/jpg,image/png"
								/>
							</div>
						</div>
					</div>
				))}
			<div className="flex justify-end items-center border-b border-inputComponentBorderColor p-3 mb-5 w-[100%]">
				<button
					onClick={() => handleAddCertificate()}
					className="float-right bg-white border-blackButton border rounded-[50px] px-5 py-2 mr-3 font-primary font-normal text-sm">
					+ Add more Certificate
				</button>
			</div>
			<div className="save mb-5 mr-5">
				<button className=" bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2  font-primary font-normal text-sm">
					Save
				</button>
			</div>
		</div>
	);
};

export default AddCertifications;
