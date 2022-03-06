import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import AutoComplete from "../../common/AutoComplete";
import SelectBox from "../../common/NewSelectBox";
import Input from "../../common/Input";
import { SEARCH_EMPLOYEE_QUERY_KEY } from "../../../Constants/apiConstants";
import Error from "../../../Pages/common/errors/Error";
import { useQuery } from "react-query";
import { apiQueries } from "../../../Axios/apiActions";

const schema = yup.object({
	firstName: yup.string(),
	email: yup.string().email("Please enter a valid email"),
	lastName: yup.string(),
	employeeId: yup.string(),
	projectName: yup.string(),
	skillSet: yup.string(),
	attribute: yup.string(),
});

const EmployeeSearch = (props) => {
	const { setIsPanOpen, setSearchParameters, setIsSearchResult, allData } = props;
	const { register, handleSubmit, formState, control, reset } = useForm({
		resolver: yupResolver(schema),
	});

	const { errors } = formState;




	const formStaticData = useMemo(() => {
		const formStaticData = {
			firstName: [],
			lastName: [],
			employeeId: [],
			email: [],
		};

		allData.data.data.data.forEach((view) => {
			formStaticData.firstName.push(view.firstName);
			formStaticData.lastName.push(view.lastName);
			formStaticData.employeeId.push(view.employeeId);
			formStaticData.email.push(view.email);
		});

		return formStaticData

	}, [allData])

	const onSubmit = (data, event) => {

		//  searchEmployee(data)
		setSearchParameters(data)
		setIsSearchResult(true)
		setIsPanOpen(false)
	};


	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="login-form">
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm  text-textlight">
						Skill Set
					</label> */}
					<SelectBox
						name="skillSet"
						errors={errors}
						label="Skill Set"
						selectLabel="Skill Set"
						control={control}
						items={[]}
					/>
					{/* <AutoComplete
						name={formData.skill_set.name}
						value={formData.skill_set.value}
						formState={{ formData, setFormData }}
						suggestions={["Design", "coding"]}
						submitError={formData.skill_set.errorMsg}
					/> */}
				</div>
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm text-textlight">
						Attribute
					</label> */}
					<SelectBox
						name="attribute"
						errors={errors}
						label="Attribute"
						selectLabel="Attribute"
						control={control}
						items={[]}
					/>
					{/* <Input
						name={formData.attribute.name}
						value={formData.attribute.value}
						formState={{ formData, setFormData }}
						submitError={formData.attribute.errorMsg}
					/> */}
				</div>
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm text-textlight">
						Project Name
					</label> */}
					<SelectBox
						name="projectName"
						errors={errors}
						label="Project Name"
						selectLabel="Project Name"
						control={control}
						items={[]}
					/>
					{/* <AutoComplete
						name={formData.project_name.name}
						submitError={formData.project_name.errorMsg}
						formState={{ formData, setFormData }}
						suggestions={["Skill Portal"]}
						submitError={formData.project_name.errorMsg}
					/> */}
				</div>
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm text-textlight">
						First Name
					</label> */}
					<SelectBox
						name="firstName"
						errors={errors}
						label="First Name"
						selectLabel="First Name"
						control={control}
						items={formStaticData && formStaticData.firstName}
					/>
					{/* <AutoComplete
						name={formData.first_name.name}
						submitError={formData.first_name.errorMsg}
						formState={{ formData, setFormData }}
						suggestions={["Lalit", "subhash"]}
						submitError={formData.first_name.errorMsg}
					/> */}
				</div>
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm text-textlight">
						Last Name
					</label> */}
					<SelectBox
						name="lastName"
						errors={errors}
						label="Last Name"
						selectLabel="Last Name"
						control={control}
						items={formStaticData && formStaticData.lastName}
					/>
					{/* <AutoComplete
						name={formData.last_name.name}
						submitError={formData.last_name.errorMsg}
						formState={{ formData, setFormData }}
						suggestions={["Mishra", "kumar"]}
					/> */}
				</div>
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm text-textlight">
						Employee ID
					</label> */}
					<SelectBox
						name="employeeId"
						errors={errors}
						label="Employee ID"
						selectLabel="Employee ID"
						control={control}
						items={formStaticData && formStaticData.employeeId}
					/>
					{/* <AutoComplete
						name={formData.employee_id.name}
						submitError={formData.employee_id.errorMsg}
						formState={{ formData, setFormData }}
						suggestions={["12345", "68798"]}
					/> */}
				</div>
				<div className="relative my-5">
					{/* <label className="text-left font-primary font-bold text-sm text-textlight">
						Email Address
					</label> */}
					<SelectBox
						name="email"
						errors={errors}
						label="Email Address"
						selectLabel="Email Address"
						control={control}
						items={formStaticData && formStaticData.email}
					/>
					{/* <Input
						type="email"
						name={formData.email.name}
						value={formData.email.value}
						submitError={formData.email.errorMsg}
						formState={{ formData, setFormData }}
					/> */}
				</div>
			</div>
			<div className="float-right">
				<button
					type="button"
					className="bg-white border-blackButton border rounded-[50px] px-5 py-2 mr-5 font-primary font-normal text-sm"
					onClick={() => {
						//	reset(initialForm);
						// setFormData(initialForm);
						reset();
					}}>
					Clear Filter
				</button>
				<button
					type="submit"
					className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm"
					onClick={() => handleSubmit()}>
					Search Employee
				</button>
			</div>
		</form>
	);
};

export default EmployeeSearch;
