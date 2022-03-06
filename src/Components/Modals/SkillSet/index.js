import React, { useState } from "react";

import "../../../temp/temp.css";
import SelectBox from "../../../Components/common/SelectBox";

import remove_icon from "../../../Assets/images/remove_icon.svg";
import add_icon from "../../../Assets/images/add_icon.svg";
import trash from "../../../Assets/images/trash.svg";

const Skillmodal = ({ onClose }) => {
  const initialForm = {
    skill_name: {
      name: "skill_name",
      value: "",
      errorMsg: null,
      required: true,
      placeholder: "Design",
      options: [{ label: "UI", value: "UI" }],
    },
    skill_sets: {
      skill_set_1: {
        skill_1: {
          name: "skill_1",
          value: "",
          errorMsg: null,
          required: false,
          placeholder: "Design",
          options: [{ label: "UI", value: "UI" }],
          rating: {
            name: "rating",
            parentName: "skill_1",
            value: "",
            errorMsg: null,
            required: false,
            placeholder: "0",
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
            ],
          },
        },
        skill_2: {
          name: "skill_2",
          value: "",
          errorMsg: null,
          required: false,
          placeholder: "Design",
          options: [],
          rating: {
            name: "rating",
            parentName: "skill_2",
            value: "",
            errorMsg: null,
            required: false,
            placeholder: "0",
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
            ],
          },
        },
      },
    },
  };


  const [formData, setFormData] = useState(initialForm);


  const handleRemoveRow = (name, parentName) => {
    let formDataCopy = { ...formData };
    delete formDataCopy.skill_sets[parentName][name];
    setFormData(formDataCopy);
  };

  const handleAddRow = (parentName) => {
    let formDataCopy = { ...formData };
    const lastIndex =
      Object.keys(formDataCopy.skill_sets[parentName]).length + 1;
    const name = `skill_${lastIndex};`;
    formDataCopy.skill_sets[parentName][name] = {
      name,
      value: "",
      errorMsg: null,
      required: false,
      placeholder: "Design",
      options: [{ label: "UI", value: "UI" }],
      rating: {
        name: "rating",
        parentName: name,
        value: "",
        errorMsg: null,
        required: false,
        placeholder: "0",
        options: [
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
        ],
      },
    };
    setFormData(formDataCopy);
  };

  const handleAddSkill = () => {
    let formDataCopy = { ...formData };
    const lastIndex = Object.keys(formDataCopy.skill_sets).length + 1;
    const name = `skill_set_${lastIndex}`;
    formDataCopy.skill_sets[name] = {
      skill_1: {
        name: "skill_1",
        value: "",
        errorMsg: null,
        required: false,
        placeholder: "Design",
        options: [{ label: "UI", value: "UI" }],
        rating: {
          name: "rating",
          parentName: "skill_1",
          value: "",
          errorMsg: null,
          required: false,
          placeholder: "0",
          options: [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ],
        },
      },
    };
    setFormData(formDataCopy);
  };

  const handleRemoveSkill = (name) => {
    let formDataCopy = { ...formData };
    delete formDataCopy.skill_sets[name];
    setFormData(formDataCopy);
  };
  return (
    <div className="">
      {formData &&
        Object.keys(formData.skill_sets).map((skillName, idx) => (
          <div
            className="p-5 mr-3 w-[460px] h-auto border border-inputComponentBorderColor rounded mb-5"
            key={idx}
          >
            <div className="flex justify-between mb-5">
              <div className="w-[75%]">
                <label className="text-left font-primary font-bold text-sm text-textlight">
                  Skill Name*
                </label>
                <SelectBox
                  name={formData.skill_name.name}
                  submitError={formData.skill_name.errorMsg}
                  formState={{ formData, setFormData }}
                />
              </div>
              {idx > 0 && (
                <div className="w-4">
                  <img
                    src={trash}
                    width="10"
                    className="w-[14px] opacity-60 hover:cursor-pointer float-right"
                    onClick={() => handleRemoveSkill(skillName)}
                  />
                </div>
              )}
            </div>

            <div className="w-[420px] h-auto">
              <div className="flex bg-tableheadColor shadow-sm shadow-inputComponentBorderColor py-5 px-2 mb-5">
                <p className="mr-[50%]">Attribute Name</p>
                <p>Rating</p>
              </div>
              {formData &&
                Object.keys(formData.skill_sets[skillName]).map(
                  (skill, skillIdx) => {
                    return (
                      <div className="flex ml-5" key={skillIdx}>
                        <div className="w-[60%] mr-5">
                          <SelectBox
                            name={formData.skill_sets[skillName][skill].name}
                            submitError={
                              formData.skill_sets[skillName][skill].errorMsg
                            }
                            formState={{
                              formData: formData.skill_sets[skillName],
                              setFormData: (inputState) => {
                                let formDataCopy = { ...formData };
                                formDataCopy.skill_sets[skillName] = {
                                  ...inputState,
                                };
                                setFormData(formDataCopy);
                              },
                            }}
                          />
                        </div>
                        <div className="flex w-[37%] items-center">
                          <SelectBox
                            name={
                              formData.skill_sets[skillName][skill].rating.name
                            }
                            submitError={
                              formData.skill_sets[skillName][skill].rating
                                .errorMsg
                            }
                            formState={{
                              formData: formData.skill_sets[skillName][skill],
                              setFormData: (inputState) => {
                                let formDataCopy = { ...formData };
                                formDataCopy.skill_sets[skillName][
                                  inputState.rating.parentName
                                ] = {
                                  ...inputState,
                                };
                                setFormData(formDataCopy);
                              },
                            }}
                          />
                          <div className=" flex justify-end">
                            <img
                              className="w-5 h-5"
                              src={remove_icon}
                              alt=""
                              onClick={() => handleRemoveRow(skill, skillName)}
                              width="5"
                              style={{
                                visibility: skillIdx === 0 ? "hidden" : "unset",
                              }}
                            />
                            <img
                              className="w-5 h-5"
                              src={add_icon}
                              alt=""
                              onClick={() => handleAddRow(skillName)}
                              width="5"
                              style={{
                                visibility:
                                  skillIdx ===
                                  Object.keys(formData.skill_sets[skillName])
                                    .length -
                                    1
                                    ? "unset"
                                    : "hidden",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        ))}

      <div className="flex justify-end items-center border-b border-inputComponentBorderColor p-3 mb-5 w-[100%]">
        <button
          className="float-right bg-white border-blackButton border rounded-[50px] px-5 py-2 mr-3 font-primary font-normal text-sm"
          onClick={() => handleAddSkill()}
        >
          + Add more Skills
        </button>
      </div>
      <div className="save mb-5 mr-5">
        <button className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2  font-primary font-normal text-sm">
          Save
        </button>
      </div>
    </div>
  );
};

export default Skillmodal;
