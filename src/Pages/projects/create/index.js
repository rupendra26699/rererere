import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import leftArrow from "../../../Assets/images/left-arrow.png";
import Input from "../../../Components/common/NewInput";
import SelectBox from "../../../Components/common/NewSelectBox";
import DateInput from "../../../Components/common/NewDateInput";
import dateFormat from "dateformat";

import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import {
	FETCH_ALL_PROJECTS_QUERY_KEY,
	CREATE_NEW_PROJECT_MUTATION_KEY,
	FETCH_BILLABILITY_STATUS_FOR_CREATE_NEW_PROJECT,
	FETCH_CREATE_PROJECT_STATIC_DATA,
	FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY,
} from "../../../Constants/apiConstants";
import { apiQueries, apiMutations } from "../../../Axios/apiActions";

const schema = yup.object({
	shortName: yup.string().required("This field is required"),
	longName: yup.string().required("This field is required"),
	projetCategory: yup.string().required("Please select a project category"),
	projectType: yup.string().required("Please select a project type"),
	pricingModel: yup.string().required("Please select a pricing model"),
	bstatus: yup.string().required("Please select billability Status"),
	accountName: yup.string().required("Please select an account name"),
	projectManagerId: yup.string().required("Please select project manager"),
	domain: yup.string().required("Please select a domain"),
	plannedStartDate: yup.date().required("This field is required"),
	plannedEndDate: yup.date().required("This field is required"),

	actualStartDate: yup.date(),
	actualEndDate: yup.date(),
	technologyStack: yup.string().required("Please select a technology stack"),
	projectStatus: yup.string().required("Please select project status"),
	referenceLink: yup.string(),
});

const ProjectsForm = () => {
	const history = useNavigate();

	const { register, handleSubmit, formState, control } = useForm({
		resolver: yupResolver(schema),
	});
	const { errors } = formState;

	const [
		isCreateProjectMutationSuccessful,
		setIsCreateProjectMuationSuccessful,
	] = useState(false);

	const {
		isLoading: isStaticLoading,
		isError: isStaticError,
		data: staticData,
	} = useQuery(
		FETCH_CREATE_PROJECT_STATIC_DATA,
		apiQueries[FETCH_CREATE_PROJECT_STATIC_DATA]
	);

	const {
		isLoading: isProjectManagersListLoading,
		isError: isProjectManagersListError,
		data: projectManagersListData,
		error: projectManagersListError,
	} = useQuery(
		FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY,
		apiQueries[FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY]
	);

	const {
		isLoading: isLoadingbstatus,
		isError: isErrorbstatus,
		data: databstatus,
	} = useQuery(
		FETCH_BILLABILITY_STATUS_FOR_CREATE_NEW_PROJECT,
		apiQueries[FETCH_BILLABILITY_STATUS_FOR_CREATE_NEW_PROJECT]
	);

	const queryClient = useQueryClient();

	const mutation = useMutation(
		(formData) => {
      formData.plannedStartDate = dateFormat(formData.plannedStartDate, "yyyy-mm-dd");
      formData.plannedEndDate = dateFormat(formData.plannedEndDate, "yyyy-mm-dd");
      formData.actualStartDate = dateFormat(formData.actualStartDate, "yyyy-mm-dd");
      formData.actualEndDate = dateFormat(formData.actualEndDate, "yyyy-mm-dd");
			return apiMutations[CREATE_NEW_PROJECT_MUTATION_KEY](formData);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(FETCH_ALL_PROJECTS_QUERY_KEY);
				setIsCreateProjectMuationSuccessful(true);
			},
		}
	);

	const onSubmitSuccess = (data, event) => {
		mutation.mutate(data);
	};
	// TODO ensure that the list of projects displayed is sorted by creation date , so that the last created project is on top
	if (isCreateProjectMutationSuccessful) return <Navigate to="/projects" />;

	return (
		<div className="main">
			<Navbar />
			<div className="flex justify-between">
				<Sidenav />

				{mutation.isError ? <div>Error while setting up mutation </div> : ""}
				<form
					className="w-[100%] mx-7 my-5"
					onSubmit={handleSubmit(onSubmitSuccess, (errors) => {})}>
					{/* <LoadingIndicator isOpen={!!mutation.isLoading} />  */}
					<div
						className="w-[290px] h-[48px] mb-3"
						onClick={() => history("/projects")}>
						<span className="hover:cursor-pointer">
							<img className="float-left w-[35px] mr-3" src={leftArrow} />
							<h1 className="font-extrabold text-[24px]">Create New Project</h1>
						</span>
					</div>
					<h2 className="text-lg font-primary font-bold text-left mb-3">
						Project Information
					</h2>

					<div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5 ">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Short Project Name*
								</label>
								<Input
									type="text"
									{...register("shortName")}
									placeholder="Enter short project name"
									errors={errors}
								/>
							</div>
							<div className="w-[100%] ">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Full Project Name*
								</label>
								<Input
									type="text"
									{...register("longName")}
									errors={errors}
									placeholder="Enter Full Project Name"
								/>
							</div>
						</div>
						<div className="w-[49%] mr-5">
						</div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5">
								<SelectBox
									name="projetCategory"
									errors={errors}
									label="Project Category*"
									selectLabel="Select Project Category"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.projectCategory
											: []
									}
								/>
							</div>
							<div className="w-[100%]">
								<SelectBox
									name="projectType"
									errors={errors}
									label="Project Type*"
									selectLabel="Select Project Type"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.projectType
											: []
									}
								/>
							</div>
						</div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5">
								<SelectBox
									name="bstatus"
									errors={errors}
									label="Billability Status*"
									selectLabel="Select Billability Status"
									control={control}
									items={
										!isLoadingbstatus && !isErrorbstatus
											? databstatus
											: []
									}
								/>
							</div>
							<div className="w-[100%] ">
								<SelectBox
									name="pricingModel"
									errors={errors}
									label="Pricing Model*"
									selectLabel="Select Pricing Model"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.pricingModels
											: []
									}
								/>
							</div>
						</div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5">
								<SelectBox
									name="accountName"
									errors={errors}
									label="Account Name*"
									selectLabel="Select Account Name"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.organizations
											: []
									}
								/>
							</div>
							<div className="w-[100%]">
								<SelectBox
									name="projectManagerId"
									errors={errors}
									label="Project Manager*"
									selectLabel="Select Project Manager"
									control={control}
									items={
										(!isProjectManagersListError && !isProjectManagersListLoading)
											? projectManagersListData.data.data
											: []
									}
									itemToString={(item) => item.employeeId}
									itemsToDisplayValue={(item) =>
										`${item.firstName}  ${item.lastName}`
									}
								/>
							</div>
						</div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Planned Start Date*
								</label>
								<DateInput name="plannedStartDate" control={control} />
							</div>
							<div className="w-[100%]">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Planned End Date*
								</label>
								<DateInput name="plannedEndDate" control={control} />
							</div>
						</div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Actual Start Date
								</label>
								<DateInput name="actualStartDate" control={control} />
							</div>
							<div className="w-[100%]">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Actual End Date
								</label>
								<DateInput name="actualEndDate" control={control} />
							</div>
						</div>
						<div className="flex justify-between mb-1">
							<div className="w-[100%] mr-5">
								<SelectBox
									name="projectStatus"
									errors={errors}
									label="Project Status*"
									selectLabel="Select Project Status"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.projectStatus
											: []
									}
								/>
							</div>
							<div className="w-[100%] ">
								<label className="text-left font-primary font-semibold text-textlight text-sm">
									Reference Link
								</label>
								<Input
									type="text"
									{...register("referenceLink")}
									errors={errors}
								/>
							</div>
						</div>
						<div className="flex justify-between mb-3">
							<div className="w-[100%] mr-5">
								<SelectBox
									name="domain"
									errors={errors}
									label="Domain"
									selectLabel="Select Domain*"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.domains
											: []
									}
								/>
							</div>
							<div className="w-[100%] ">
								<SelectBox
									name="technologyStack"
									errors={errors}
									label="Technology Stack"
									selectLabel="Select Technology Stack*"
									control={control}
									items={
										!isStaticLoading && !isStaticError
											? staticData.data.data.technologyStack
											: []
									}
								/>
							</div>
						</div>
					</div>
					<div className="float-right">
						<button
							type="button"
							className="bg-white border-blackButton border rounded-[50px] px-5 py-2 font-primary font-normal text-sm mr-5"
							onClick={() => {
								history("/projects");
							}}>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProjectsForm;
