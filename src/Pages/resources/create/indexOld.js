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
import { useQuery, useMutation } from "react-query";
import { FETCH_CREATE_EMPLOYEE_STATIC_DATA, FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY } from "../../../Constants/apiConstants";
import { apiQueries } from "../../../Axios/apiActions";
import Error from "../../common/errors/Error";
import LoadingIndicator from "../../../Components/common/NewLoadingIndicator";

const schema = yup.object({
    firstName: yup.string().required("This field is required "),
    middleName: yup.string(),
    lastName: yup.string().required("This field is required "),
    id: yup.string().required("This field is required "),
    departmentName: yup.string(),
    reportingTo: yup.string().required("This field is required "),
    resourceStatus: yup.string().required("This field is required "),
    resourceType: yup.string().required("This field is required "),
    role: yup.string().required("This field is required "),
    education: yup.string().required("This field is required "),
    dateOfJoin: yup.date().required("This field is required "),
    dateOfExit: yup.date(),
    email: yup
        .string()
        .required("This field is required ")
        .email("Please enter a valid email "),
    phoneNumber: yup.string().matches(PHONE_REG_EXP, "Phone number is not valid"),
    officeLocation: yup.string().required("This field is required "),
    designation: yup.string().required("This field is required "),
    experienceOnJoiningYear: yup.date().required("This field is required "),
    experienceOnJoiningMonth: yup.date().required("This field is required "),
    deployable: yup.number().required("This field is required ").typeError("This field should be a number").min(0, "This field value cannont be less than 0").max(100, "This field value cannot be more than 100"),
    gaPercentage: yup.number().typeError("This field should be a number").required("This field is required ").min(0, "This field value cannont be less than 0").max(100, "This field value cannot be more than 100"),
    ohPercentage: yup.number().typeError("This filed should be a  number").required("This field is required ").min(0, "This field value cannont be less than 0").max(100, "This field value cannot be more than 100"),
    effectiveDate: yup.date().required("This field is required "),
    uploadPicture: yup.string().required("This field is required "),
    uploadResume: yup.string().required("This field is required "),
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



    // const showFormError = useSelector(
    // 	(state) => state.newUiState.loginPage.showFormError
    // );
    // const formErrorMessage = useSelector(
    // 	(state) => state.newUiState.loginPage.formErrorMessage
    // );
    // const requestInProgress = useSelector(
    // 	(state) => state.newUiState.loginPage.requestInProgress
    // );

    const onSubmitSuccess = (data, event) => {
        //handle form submission ;
    };
    const { errors } = formState;
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [certificateModal, setCertificateModal] = useState(false);



    if (staticError || isProjectManagersListError) {
        return <Error type="general" />;
    }
    if (isStaticLoading || isProjectManagersListLoading) {
        return <LoadingIndicator isOpen={isStaticLoading || isProjectManagersListLoading} />;
    }

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
                    <form onSubmit={handleSubmit(onSubmitSuccess)}>
                        <div className="form-wrapper">
                            <div className="flex justify-between mb-1">
                                <div className="w-[100%] mr-5">
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
                                <div className="w-[100%] mr-5">
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
                                <div className="w-[100%] mr-5">
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
                                <div className="w-[100%] mr-5">
                                    <label className="text-left font-primary font-semibold text-textlight text-sm">
                                        Employee ID*
                                    </label>
                                    <Input
                                        type="text"
                                        {...register("Id")}
                                        placeholder="Enter Emloyee ID"
                                        errors={errors}
                                    />
                                </div>
                                <div className="w-[100%] mr-5">
                                    {/* <label className="text-left font-primary font-semibold text-textlight text-sm">
										Department Name
									</label> */}
                                    {/* <AutoComplete
                  name={formData.department_name.name}
                  suggestions={["UI", "Backend"]}
                  submitError={formData.department_name.errorMsg}
                  formState={{ formData, setFormData }}
                /> */}
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
                                <div className="w-[100%] mr-5">
                                    {/* <label className="text-left font-primary font-semibold text-textlight text-sm">
										Reporting To*
									</label> */}
                                    {/* <AutoComplete suggestions={[]} {...register("reportingTo")} /> */}
                                    <SelectBox
                                        name="reportingTo"
                                        errors={errors}
                                        label="Reporting To*"
                                        selectLabel="Select Employee*"
                                        control={control}

                                        items={!isProjectManagersListError ? projectManagersListData.data.data : []}
                                        itemToString={(item) => `${item.firstName}  ${item.lastName}`}

                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mb-1">
                                <div className="w-[100%] mr-5">
                                    {/* <label className="text-left font-primary font-semibold text-textlight text-sm">
										Employee Status*
									</label>
									<SelectBox options={[]} {...register("resourceStatus")} /> */}
                                    <SelectBox
                                        name="resourceStatus"
                                        errors={errors}
                                        label="Employee Status*"
                                        selectLabel="Select Employee Status*"
                                        control={control}
                                        items={["Active", "Inactive"]}
                                    />
                                </div>
                                <div className="w-[100%] mr-5">
                                    {/* <label className="text-left font-primary font-semibold text-textlight text-sm">
										Employee Type*
									</label>
									<SelectBox options={[]} {...register("resourceType")} /> */}
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
                                <div className="w-[100%] mr-5">
                                    {/* <label className="text-left font-primary font-semibold text-textlight text-sm">
										Role*
									</label>
									<SelectBox options={[]} {...register("role")} /> */}
                                    <SelectBox
                                        name="role"
                                        errors={errors}
                                        label="Role*"
                                        selectLabel="Select Role"
                                        control={control}
                                        items={!isStaticError ? staticData.data.data.roles : []}
                                        itemToString={(item) => item.name}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mb-1">
                                <div className="w-[100%] mr-5">
                                    {/* <label className="text-left font-primary font-semibold text-textlight text-sm">
										Education*
									</label>
									<SelectBox options={[]} {...register("education")} /> */}
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
                                <div className="w-[100%] mr-5">
                                    <label className="text-left font-primary font-semibold text-textlight text-sm">
                                        Joining Date*
                                    </label>
                                    <DateInput name="dateOfJoin" control={control} />
                                </div>
                                <div className="w-[100%] mr-5">
                                    <label className="text-left font-primary font-semibold text-textlight text-sm">
                                        End Date
                                    </label>
                                    <DateInput name="dateOfExit" control={control} />
                                </div>
                            </div>
                            <div className="flex justify-between mb-1">
                                <div className="w-[100%] mr-5">
                                    <label className="text-left font-primary font-semibold text-textlight text-sm">
                                        Email Address*
                                    </label>
                                    <Input type="email" {...register("email")} errors={errors} />
                                </div>
                                <div className="w-[100%] mr-5">
                                    <label className="text-left font-primary font-semibold text-textlight text-sm">
                                        Phone Number
                                    </label>
                                    <Input
                                        type="text"
                                        {...register("number")}
                                        errors={errors}
                                    />
                                </div>
                                <div className="w-[100%] mr-5">
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

                            {/* <div className="w-[100%] mr-5">
              <label className="text-left font-primary font-semibold text-textlight text-sm">
                Date of Birth*
              </label>
              <DateInput
                name={formData.date_of_birth.name}
                value={formData.date_of_birth.value}
                formState={{ formData, setFormData }}
                submitError={formData.date_of_birth.errorMsg}
              />
            </div> */}
                            <div className="flex justify-between mb-1">
                                <div className="w-[100%] mr-5">
                                    {/* <AutoComplete
                  name={formData.designation.name}
                  suggestions={["Manager", "Trainee"]}
                  formState={{ formData, setFormData }}
                  submitError={formData.designation.errorMsg}
                /> */}
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
                                <div className="w-[100%] mr-3">
                                    <label className="text-left font-primary font-semibold text-textlight text-sm mb-3">
                                        Total experience at the time of joining*
                                    </label>
                                    <div className="flex justify-between w-[100%]">
                                        <SelectBox
                                            name="experienceOnJoining"
                                            errors={errors}
                                            selectLabel="Select Year"
                                            control={control}
                                            items={experienceYears}
                                            itemToString={(year) => (year === 1 || year === 0) ? `${year} year` : `${year} years`}
                                        />
                                        <SelectBox
                                            name="month"
                                            errors={errors}
                                            selectLabel="Select Month"
                                            control={control}
                                            items={experienceMonths}
                                            itemToString={(month) => (month === 1 || month === 0) ? `${month} month` : `${month} months`}
                                        />
                                    </div>
                                </div>
                                <div className="w-[100%] mr-3">
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
                                            itemToString={(year) => (year === 1 || year === 0) ? `${year} year` : `${year} years`}
                                        />
                                        <SelectBox
                                            name="expOnDateMonth"
                                            errors={errors}
                                            selectLabel="Select Month"
                                            control={control}
                                            items={experienceMonths}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex justify-between mb-5">
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Local Address*
                </label>
                <Input
                  type="text"
                  name={formData.local_address.name}
                  value={formData.local_address.value}
                  formState={{ formData, setFormData }}
                  submitError={formData.local_address.errorMsg}
                />
              </div>
              <div className="w-[100%]">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Permanent Address
                </label>
                <Input
                  type="text"
                  name={formData.permanent_address.name}
                  value={formData.permanent_address.value}
                  formState={{ formData, setFormData }}
                  submitError={formData.permanent_address.errorMsg}
                />
              </div>
            </div>
            <div className="flex justify-between mb-5">
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Resource Type*
                </label>
                <AutoComplete
                  name={formData.resource_type.name}
                  suggestions={["DBS", "Maxlife"]}
                  submitError={formData.resource_type.errorMsg}
                  formState={{ formData, setFormData }}
                />
              </div>
            </div>
            <div className="flex justify-between mb-5"></div>
            <div className="flex justify-between mb-5">
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Resource Status*
                </label>
                <SelectBox
                  name={formData.resource_status.name}
                  submitError={formData.resource_status.errorMsg}
                  formState={{ formData, setFormData }}
                />
              </div>
            </div> */}

                            <div className="justify-between items-center mb-1 mr-5 pr-2">
                                <h2 className="text-lg font-primary font-bold text-left mb-3">
                                    Allocation Type
                                </h2>
                                <div className="flex justify-between mb-3">
                                    <div className="flex w-[100%] mr-5 items-stretch flex-col">
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
                                    <div className="flex w-[75%] mr-5 items-stretch flex-col">
                                        <label className="text-left font-primary font-semibold text-textlight text-sm mr-3 self-start">
                                            G&A%*
                                        </label>
                                        <Input
                                            type="text"
                                            {...register("gaPercentage")}
                                            errors={errors}
                                            placeholder="G&A%"
                                        />
                                    </div>
                                    <div className="flex w-[75%] mr-5 items-stretch flex-col">
                                        <label className="text-left font-primary font-semibold text-textlight text-sm mr-3 self-start">
                                            OH%*
                                        </label>
                                        <Input
                                            type="text"
                                            {...register("ohPercentage")}
                                            errors={errors}
                                            placeholder="OH%"
                                        />
                                    </div>
                                    <div className="flex w-[100%] items-center flex-col">
                                        <label className="text-left font-primary font-semibold text-textlight text-sm w-48 mr-2 self-start">
                                            Effective Date*
                                        </label>
                                        <DateInput name="effectiveDate" control={control} />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="half-input mb-5">
              <label className="text-left font-primary font-semibold text-textlight text-sm">Allocation Type</label>
              <div className="radio-input">
                <input
                  name="allocation"
                  type="radio"
                  value={formData.deployable.value}
                ></input>
                {formData.deployable.placeholder} &nbsp; &nbsp;
                <input
                  name="allocation"
                  type="radio"
                  value={formData.non_deployable.value}
                ></input>
                {formData.non_deployable.placeholder}
              </div>
            </div> */}

                            <div className="flex justify-between mb-3">
                                <div className="w-[100%] mr-5">
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
                                <div className="w-[100%]">
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
