import React, { useState } from "react";
import DateInput from "../../common/DateInput";


import TextArea from "../../common/textArea";

const AllocationExtension = () => {
  const initialForm = {
    new_end_date: {
      name: "new_end_date",
      value: "",
      placeholder: "DD/MMM/YYYY",
      required: true,
      errorMsg: null,
    },
    remark: {
      name: "remark",
      value: "",
      placeholder: "Remark",
      required: true,
      errorMsg: null,
    },
  };
  const [formData, setFormData] = useState(initialForm);

  const handleSubmit = () => {
    const formDataCopy = { ...formData };
    let isError = false;
    Object.keys(formDataCopy).every((inputName) => {
      if (
        formDataCopy[inputName].required &&
        formDataCopy[inputName].value === ""
      ) {
        formDataCopy[inputName].errorMsg = "This field is required";
        isError = true;
        return false;
      } else return true;
    });

    if (isError) {
      setFormData(formDataCopy);
      return;
    }
    // form submit code
  };
  return (
    <div className="pt-2">
      <div className="w-[100%] mb-3">
        <label className="text-left font-primary font-bold text-sm text-textlight">
          New End Date*
        </label>
        <DateInput
          name={formData.new_end_date.name}
          value={formData.new_end_date.value}
          formState={{ formData, setFormData }}
          submitError={formData.new_end_date.errorMsg}
        />
      </div>
      <div className="w-[100%] mb-5">
        <label className="text-left font-primary font-bold text-sm text-textlight">
          Remark*
        </label>
        <TextArea
          name={formData.remark.name}
          value={formData.remark.value}
          formState={{ formData, setFormData }}
          submitError={formData.remark.errorMsg}
        />
      </div>
      <div className="float-right">
        <button
          className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AllocationExtension;
