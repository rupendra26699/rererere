import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AutoComplete from "../../common/AutoComplete";
import Input from "../../common/Input";
import SelectBox from "../../common/NewSelectBox";
// import SelectBox from "../../common/SelectBox";

const schema = yup.object({
	shortName: yup.string(),
	bstatus: yup.string(),
	projectId: yup.string(),
	projectManagerId: yup.string(),
	projectType: yup.string(),
	status: yup.string(),
	accountName: yup.string(),
	pricingModel: yup.string(),
});

const ProjectSearch = (props) => {
	const { setIsPanOpen, setSearchParameters, setIsSearchResult, allData } =
		props;
	const { register, handleSubmit, formState, control, reset } = useForm({
		resolver: yupResolver(schema),
	});

	const { errors } = formState;

	const formStaticData = useMemo(() => {
		const formStaticData = {
			shortName: [],
			// id: [],
			projectManagerId: [],
			accountName: [],
			projectType: [],
			bstatus: [],
			pricingModel: [],
			status: [],
			projectId: [],
		};

		allData &&
			allData.data.data.data.forEach((view) => {
				view.shortName &&
					!formStaticData.shortName.includes(view.shortName) &&
					formStaticData.shortName.push(view.shortName);
				// view.id &&
				// 	!formStaticData.id.includes(view.id) &&
				// 	formStaticData.id.push(view.id);
				view.projectManagerId &&
					!formStaticData.projectManagerId.includes(view.projectManagerId) &&
					formStaticData.projectManagerId.push(view.projectManagerId);
				view.accountName &&
					!formStaticData.accountName.includes(view.accountName) &&
					formStaticData.accountName.push(view.accountName);
				view.projectType &&
					!formStaticData.projectType.includes(view.projectType) &&
					formStaticData.projectType.push(view.projectType);
				view.bstatus &&
					!formStaticData.bstatus.includes(view.bstatus) &&
					formStaticData.bstatus.push(view.bstatus);
				view.pricingModel &&
					!formStaticData.pricingModel.includes(view.pricingModel) &&
					formStaticData.pricingModel.push(view.pricingModel);
				view.status &&
					!formStaticData.status.includes(view.status) &&
					formStaticData.status.push(view.status);
				view.projectId &&
					!formStaticData.projectId.includes(view.projectId) &&
					formStaticData.projectId.push(view.projectId);
			});

		return formStaticData;
	}, [allData]);

	const onSubmit = (data, event) => {
		//  searchEmployee(data)
		setSearchParameters(data);
		setIsSearchResult(true);
		setIsPanOpen(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="login-form">
				<div className="relative my-5">
					<SelectBox
						name="shortName"
						errors={errors}
						label="Short Project Name"
						selectLabel="Short Project Name"
						control={control}
						items={formStaticData && formStaticData.shortName}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="projectId"
						errors={errors}
						label="Project ID"
						selectLabel="Project ID"
						control={control}
						items={formStaticData && formStaticData.projectId}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="projectManagerId"
						errors={errors}
						label="Project Manager"
						selectLabel="Project Manager"
						control={control}
						items={formStaticData && formStaticData.projectManagerId}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="accountName"
						errors={errors}
						label="Account Name"
						selectLabel="Account Name"
						control={control}
						items={formStaticData && formStaticData.accountName}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="projectType"
						errors={errors}
						label="Project Type"
						selectLabel="Project Type"
						control={control}
						items={formStaticData && formStaticData.projectType}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="bstatus"
						errors={errors}
						label="Billability Status"
						selectLabel="Billability Status"
						control={control}
						items={formStaticData && formStaticData.bstatus}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="pricingModel"
						errors={errors}
						label="Pricing Model"
						selectLabel="Pricing Model"
						control={control}
						items={formStaticData && formStaticData.pricingModel}
					/>
				</div>
				<div className="relative my-5">
					<SelectBox
						name="status"
						errors={errors}
						label="Project Status"
						selectLabel="Project Status"
						control={control}
						items={formStaticData && formStaticData.status}
					/>
				</div>
			</div>
			<div className="float-right">
				<button
					type="button"
					className="bg-white border-blackButton border rounded-[50px] px-5 py-2  font-primary font-normal text-sm mr-5"
					onClick={() => {
						reset();
					}}>
					Clear Filter
				</button>
				<button
					type="submit"
					className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm">
					Search Project
				</button>
			</div>
		</form>
	);
};

export default ProjectSearch;
