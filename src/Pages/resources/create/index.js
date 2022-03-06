import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import leftArrow from "../../../Assets/images/left-arrow.png";
import Input from "../../../Components/common/NewInput";
import SelectBox from "../../../Components/common/NewSelectBox";
import DateInput from "../../../Components/common/NewDateInput";
import "react-sliding-pane/dist/react-sliding-pane.css";
import FileBrowser from "../../../Components/common/FileBrowser";
import Skillmodal from "../../../Components/Modals/SkillSet";
import CustomModal from "../../../Components/common/CustomModal";
import AddCertifications from "../../../Components/Modals/AddCertifications";
import { PHONE_REG_EXP } from "../../../Constants/contants";
import AutoComplete from "../../../Components/common/AutoComplete";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FETCH_CREATE_EMPLOYEE_STATIC_DATA, FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY, CREATE_NEW_EMPLOYEE_MUTATION_KEY, FETCH_ALL_EMPLOYEES_QUERY_KEY } from "../../../Constants/apiConstants";
import { apiQueries, apiMutations } from "../../../Axios/apiActions";
import Error from "../../common/errors/Error";
import LoadingIndicator from "../../../Components/common/NewLoadingIndicator";
import { Navigate } from "react-router-dom";
import { debounce } from "lodash"
import { isEmployeeEmailAvailable, isEmployeeIdAvailable } from "../../../Axios/apiCalls";
const schema = yup.object({
	firstName: yup.string().required("This field is required "),
	middleName: yup.string(),
	lastName: yup.string().required("This field is required "),
	//TODO debounce the calls , and cancel existing in progress calls
	employeeId: yup.string().required("This field is required ").test("isIdAvailable", "This employeeId is already taken",

		async (value, testContext) => await isEmployeeIdAvailable(value)

	),
	departmentName: yup.string(),
	reportingTo: yup.string().required("This field is required "),
	// TODO instead of using typeError hack for showing the right error message , implement it the right way .
	status: yup.number().required("This field is required ").typeError("This field is required"),
	resourceType: yup.string().required("This field is required "),
	roleId: yup.number().required("This field is required ").typeError("This field is required"),
	education: yup.string().required("This field is required "),
	dateOfJoin: yup.string().required("This field is required "), // format "2021-01-01"
	dateOfExit: yup.string(),
	email: yup
		.string()
		.required("This field is required ")
		.email("Please enter a valid email ").test("isEmailAvailable", "This email is already taken",
			async (value, testContext) => await isEmployeeEmailAvailable(value)
		),
	phoneNumber: yup.string().matches(PHONE_REG_EXP, "Phone number is not valid"),
	officeLocation: yup.string().required("This field is required "),
	designation: yup.string().required("This field is required "),
	expAtJoiningYears: yup.number().required("This field is required ").typeError("This field is required"),
	// TODO Get spelling fixed
	expAtjoiningMonths: yup.number().required("This field is required ").typeError("This field is required"),
	deployable: yup.number().required("This field is required ").typeError("This field should be a number").min(0, "This field value cannont be less than 0").max(100, "This field value cannot be more than 100"),
	gAndA: yup.number().typeError("This field should be a number").required("This field is required ").min(0, "This field value cannont be less than 0").max(100, "This field value cannot be more than 100"),
	oh: yup.number().typeError("This filed should be a  number").required("This field is required ").min(0, "This field value cannont be less than 0").max(100, "This field value cannot be more than 100"),
	effectiveDate: yup.string().required("This field is required "),
	//uploadPicture: yup.string().required("This field is required "),
	//	uploadResume: yup.string().required("This field is required "),
});

const experienceYears = [];
for (let i = 0; i < 100; i++) {
	experienceYears.push(i);
}

const experienceMonths = [];

for (let i = 0; i < 12; i++) {
	experienceMonths.push(i)
}


const ResourceForm = () => {
	const history = useNavigate();

	const [isResourceCreationSuccessful, setIsResourceCreationSuccessful] = useState(false)

	const {
		isLoading: isStaticLoading,
		isError: isStaticError,
		data: staticData,
		error: staticError,
	} = useQuery(
		FETCH_CREATE_EMPLOYEE_STATIC_DATA,
		apiQueries[FETCH_CREATE_EMPLOYEE_STATIC_DATA]
	);


	const {
		isLoading: isProjectManagersListLoading,
		isError: isProjectManagersListError,
		data: projectManagersListData,
		error: projectManagersListError
	} = useQuery(FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY, apiQueries[FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY]);

	const { register, handleSubmit, formState, control } = useForm({
		resolver: yupResolver(schema),
	});


	const { errors } = formState;
	const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
	const [certificateModal, setCertificateModal] = useState(false);

	const queryClient = useQueryClient();
	const mutation = useMutation((formData) => {

		return (apiMutations[CREATE_NEW_EMPLOYEE_MUTATION_KEY])(formData);
	}, {
		onSuccess: () => {
			// TODO also invalidate any search queryies . Search queries can possibly be invalidated with a common prefix 
			//	queryClient.invalidateQueries()
			//TODO invalidate only one query
			queryClient.invalidateQueries(FETCH_ALL_EMPLOYEES_QUERY_KEY);
			setIsResourceCreationSuccessful(true)
		}
	})

	const onSubmitSuccess = (data, event) => {
		mutation.mutate(data)
	};

	const onSubmitError = (error, event) => {
	}


	if (staticError || isProjectManagersListError || mutation.isError) {
		return <Error type="general" />;
	}
	if (isStaticLoading || isProjectManagersListLoading || mutation.isLoading) {
		return <LoadingIndicator isOpen={isStaticLoading || isProjectManagersListLoading} />;
	}



	if (!!isResourceCreationSuccessful) return <Navigate to="/employee" />
	return (
		<div className="main">
			<Navbar />
			<div className="flex justify-between">
				<Sidenav />
				<div className="w-[100%] mx-7 my-5">
					<div
						className="w-[290px] h-[48px] mb-3"
						onClick={() => history("/employee")}>
						<span className="hover:cursor-pointer">
							<img className="float-left w-[35px] mr-3" src={leftArrow} />
							<h1 className="font-extrabold text-[24px]">
								Create New Employee
							</h1>
						</span>
					</div>
					<h2 className="text-lg font-primary font-bold text-left mb-5">
						General Information
					</h2>
					<form onSubmit={handleSubmit(onSubmitSuccess, (errors) => {
					})}>
						<div className="form-wrapper">
							<div className="flex justify-between mb-1">
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										First Name*
									</label>
									<Input
										type="text"
										{...register("firstName")}
										placeholder="Enter First Name"
										errors={errors}
									/>
								</div>
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Middle Name
									</label>
									<Input
										type="text"
										{...register("middleName")}
										placeholder="Enter Middle Name"
										errors={errors}
									/>
								</div>
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Last Name*
									</label>
									<Input
										type="text"
										{...register("lastName")}
										placeholder="Enter Last Name"
										errors={errors}
									/>
								</div>
							</div>
							<div className="flex justify-between mb-1">
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Employee ID*
									</label>
									<Input
										type="text"
										{...register("employeeId")}
										placeholder="Enter Emloyee ID"
										errors={errors}
									/>
								</div>
								<div className="mr-5 grow basis-0">

									<SelectBox
										name="departmentName"
										errors={errors}
										label="Department Name"
										selectLabel="Select Department"
										control={control}
										items={
											!isStaticError ? staticData.data.data.departments : []
										}
									/>
								</div>
								<div className="mr-5 grow basis-0">

									<SelectBox
										name="reportingTo"
										errors={errors}
										label="Reporting To*"
										selectLabel="Select Employee*"
										control={control}

										items={!isProjectManagersListError ? projectManagersListData.data.data : []}
										itemToString={(item) => item.employeeId}
										itemsToDisplayValue={(item) => `${item.firstName}  ${item.lastName}`}

									/>
								</div>
							</div>
							<div className="flex justify-between mb-1">
								<div className="mr-5 grow basis-0">

									<SelectBox
										name="status"
										errors={errors}
										label="Employee Status*"
										selectLabel="Select Employee Status*"
										control={control}
										items={!isStaticError ? staticData.data.data.status : []}
										itemToString={(item) => !item ? undefined : Number(item.id)}
										itemsToDisplayValue={(item) => item.name}
										defaultValue={undefined}
									/>
								</div>
								<div className="mr-5 grow basis-0">

									<SelectBox
										name="resourceType"
										errors={errors}
										label="Employee Type*"
										selectLabel="Select Employee Type*"
										control={control}
										items={
											!isStaticError ? staticData.data.data.employeeTypes : []
										}

									/>
								</div>
								<div className="mr-5 grow basis-0">

									<SelectBox
										name="roleId"
										errors={errors}
										label="Role*"
										selectLabel="Select Role"
										control={control}
										items={!isStaticError ? staticData.data.data.roles : []}
										itemToString={(item) => item.id}
										itemsToDisplayValue={(item) => item.name}
									/>
								</div>
							</div>
							<div className="flex justify-between mb-1">
								<div className=" mr-5 grow basis-0">

									<SelectBox
										name="education"
										errors={errors}
										label="Education*"
										selectLabel="Select Education"
										control={control}
										items={
											!isStaticError ? staticData.data.data.educations : []
										}
									/>
								</div>
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Joining Date*
									</label>
									<DateInput name="dateOfJoin" control={control} />
								</div>
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										End Date
									</label>
									<DateInput name="dateOfExit" control={control} />
								</div>
							</div>
							<div className="flex justify-between mb-1 basis-0">
								<div className="mr-5 basis-0 grow">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Email Address*
									</label>
									<Input type="email" {...register("email")} errors={errors} />
								</div>
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Phone Number
									</label>
									<Input
										type="text"
										{...register("phoneNumber")}
										errors={errors}
									/>
								</div>
								<div className="mr-5 grow basis-0">
									<SelectBox
										name="officeLocation"
										errors={errors}
										label="Location*"
										selectLabel="Select Location"
										control={control}
										items={!isStaticError ? staticData.data.data.locations : []}
									/>
								</div>
							</div>

							<div className="flex justify-between mb-1">
								<div className=" mr-5 grow basis-0">

									<SelectBox
										name="designation"
										errors={errors}
										label="Designation*"
										selectLabel="Select Designation"
										control={control}
										items={
											!isStaticError ? staticData.data.data.designations : []
										}
									/>
								</div>
								<div className="mr-5 grow basis-0 pr-[10px]">
									<label className="text-left font-primary font-semibold text-textlight text-sm mb-3 ">
										Total experience at the time of joining*
									</label>
									<div className="flex justify-between w-[100%]">
										<SelectBox
											name="expAtJoiningYears"
											errors={errors}
											selectLabel="Select Year"
											control={control}
											items={experienceYears}
											itemToString={(value) => Number(value)}
											itemsToDisplayValue={(year) => (year === 1 || year === 0) ? `${year} year` : `${year} years`}
										/>
										<SelectBox
											name="expAtjoiningMonths"
											errors={errors}
											selectLabel="Select Month"
											control={control}
											items={experienceMonths}
											//	itemToString={(month) => (month === 1 || month === 0) ? `${month} month` : `${month} months`}
											itemToString={(value) => Number(value)}
											itemsToDisplayValue={(month) => (month === 1 || month === 0) ? `${month} month` : `${month} months`}
										/>
									</div>
								</div>
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm mb-3">
										Total experience as on Date*
									</label>
									<div className="flex justify-between w-[100%]">
										<SelectBox
											name="expOnDateYear"
											errors={errors}
											selectLabel="Select Year"
											control={control}
											items={experienceYears}
											//	itemToString={(year) => (year === 1 || year === 0) ? `${year} year` : `${year} years`}
											itemToString={(value) => Number(value)}
											itemsToDisplayValue={(year) => (year === 1 || year === 0) ? `${year} year` : `${year} years`}
										/>
										<SelectBox
											name="expOnDateMonth"
											errors={errors}
											selectLabel="Select Month"
											control={control}
											items={experienceMonths}
											//	itemToString={(month) => (month === 1 || month === 0) ? `${month} month` : `${month} months`}
											itemToString={(value) => Number(value)}
											itemsToDisplayValue={(month) => (month === 1 || month === 0) ? `${month} month` : `${month} months`}
										/>
									</div>
								</div>
							</div>

							<div className="justify-between items-center mb-1 mr-5 pr-2">
								<h2 className="text-lg font-primary font-bold text-left mb-3">
									Allocation Type
								</h2>
								<div className="flex justify-between mb-3">
									<div className="flex grow basis-0 mr-5 items-stretch flex-col">
										<label className="text-left font-primary font-semibold text-textlight text-sm w-40 mr-2 self-start">
											Deployable %*
										</label>
										<Input
											type="text"
											{...register("deployable")}
											errors={errors}
											placeholder="Deployable %"
										/>
									</div>
									<div className="flex grow basis-0 mr-5 items-stretch flex-col">
										<label className="text-left font-primary font-semibold text-textlight text-sm mr-3 self-start">
											G&A%*
										</label>
										<Input
											type="text"
											{...register("gAndA")}
											errors={errors}
											placeholder="G&A%"
										/>
									</div>
									<div className="flex grow mr-5 basis-0 items-stretch flex-col">
										<label className="text-left font-primary font-semibold text-textlight text-sm mr-3 self-start">
											OH%*
										</label>
										<Input
											type="text"
											{...register("oh")}
											errors={errors}
											placeholder="OH%"
										/>
									</div>
									<div className="flex grow basis-0  items-stretch flex-col">
										<label className="text-left font-primary font-semibold text-textlight text-sm w-48 mr-2 self-start">
											Effective Date*
										</label>
										<DateInput name="effectiveDate" control={control} />
									</div>
								</div>
							</div>



							<div className="flex justify-between mb-3">
								<div className="mr-5 grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Upload Picture*
									</label>
									<FileBrowser
										id="upload"
										label="fileuploader"
										span="file-chosen"
										accept="image/jpeg,image/jpg,image/png"
										text="Size of image should not be more than 2Mb.You may only upload
                  JPG, JPEG, PNG"
									/>
								</div>
								<div className="grow basis-0">
									<label className="text-left font-primary font-semibold text-textlight text-sm">
										Upload Resume*
									</label>

									<FileBrowser
										id="uploadresume"
										label="fileuploader"
										span="file-chosen"
										text="Size of image should not be more than 2Mb."
										accept="image/jpeg,image/jpg,image/png,application/pdf,application/msword,text/plain"
									/>
								</div>
							</div>
							<div className="flex justify-between p-5 items-center border-2 border-inputComponentBorderColor mb-2">
								<h2 className="text-lg font-primary font-bold text-left mb-2">
									Skill set
								</h2>
								<button
									onClick={() => {
										setIsSkillModalOpen(true);
									}}
									type="button"
									className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm">
									Add
								</button>
							</div>
							<div className="flex justify-between p-5 items-center border-2 border-inputComponentBorderColor mb-5">
								<h2 className="text-lg font-primary font-bold text-left mb-2">
									Certification
								</h2>
								<button
									type="button"
									className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm"
									onClick={() => setCertificateModal(!certificateModal)}>
									Add
								</button>
							</div>
						</div>
						<div className="float-right">
							<button
								type="button"
								className="bg-white border-blackButton border rounded-[50px] px-5 py-2  font-primary font-normal text-sm mr-5"
								onClick={() => {
									history("/employee");
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
			<CustomModal
				show={isSkillModalOpen}
				size="w-[40%] h-[90%]"
				onClose={() => setIsSkillModalOpen(false)}
				modalComponent={
					<Skillmodal onClose={() => setIsSkillModalOpen(false)} />
				}
				title="Add Skill Set"
			/>

			<CustomModal
				show={certificateModal}
				size="w-[40%] h-[90%]"
				onClose={() => setCertificateModal(false)}
				modalComponent={
					<AddCertifications onClose={() => setCertificateModal(false)} />
				}
				title="Add Certification"
			/>
		</div>
	);
};
export default ResourceForm;
