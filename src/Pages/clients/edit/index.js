import React, { useEffect } from "react";

import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import leftArrow from "../../../Assets/images/left-arrow.png";
import Input from "../../../Components/common/NewInput";
import SelectBox from "../../../Components/common/newSelect";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiCaller from "../../../Axios/apiCaller";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import {
  GET_ACCOUNT_BY_ID_KEY,
  GET_ACCOUNT_BY_ID_URL,
  EDIT_ACCOUNT_MUTATION_KEY,
  FETCH_COUNTRY_DATA_KEY,
} from "../../../Constants/apiConstants";
import { apiMutations, apiQueries } from "../../../Axios/apiActions";

const schema = yup.object({
  // TODO validate userName for it either being a valid email or an employeeId
  name: yup.string().required("This field is required "),
  accountId: yup.string().required("This field is required"),
  country: yup.string().required("This field is required"),
  accountManager: yup.string().required("This field is required"),
});

const EditClientForm = () => {
  const { id } = useParams();

  const getAccountByID = () => {
    return apiCaller.get(`${GET_ACCOUNT_BY_ID_URL}/${id}`);
  };

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const account = getAccountByID();
    account.then((res) => {
      setValue("accountId", res.data.data.accountId);
      setValue("name", res.data.data.name);
      setValue("country", res.data.data.country);
      setValue("accountManager", res.data.data.accountManager);
    });
    //
  }, []);

  const history = useNavigate();

  const { data: country } = useQuery(
    FETCH_COUNTRY_DATA_KEY,
    apiQueries[FETCH_COUNTRY_DATA_KEY]
  );
  // console.log(country);
  const countryList = [];

  country?.data?.data?.map((items) => {
    countryList.push({ label: items.country, value: items.country });
  });

  const { errors } = formState;

  const { mutate } = useMutation((data) => {
    return apiMutations[EDIT_ACCOUNT_MUTATION_KEY](data);
  });

  const onSubmitSuccess = (data, event) => {
    mutate(data);
    history("/clients");
  };

  return (
    <div className="main">
      <Navbar />
      <div className="flex justify-between">
        <Sidenav />
        <form
          onSubmit={handleSubmit(onSubmitSuccess)}
          className="w-[100%] mx-7 my-5"
        >
          <div
            className="w-[290px] h-[48px] mb-3"
            onClick={() => history("/clients")}
          >
            <span>
              <img className="float-left w-[35px] mr-3" src={leftArrow} />

              <h1 className="font-extrabold text-[24px]">Edit Account</h1>
            </span>
          </div>
          <div className="form-wrapper">
            <div className="flex justify-between mb-5">
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Account Name*
                </label>
                <Input type="text" {...register("name")} errors={errors} />
              </div>
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Account ID
                </label>
                <Input
                  type="text"
                  {...register("accountId")}
                  errors={errors}
                  readonly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex justify-between mb-5">
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Country*
                </label>
                <SelectBox
                  type="text"
                  {...register("country")}
                  value={countryList}
                  errors={errors}
                />
              </div>
              <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Account Manager
                </label>
                <Input
                  type="text"
                  {...register("accountManager")}
                  errors={errors}
                />
              </div>
            </div>
            <div className="float-right">
              <button
                type="button"
                className="bg-white border-blackButton border rounded-[50px] px-5 py-2  font-primary font-normal text-sm mr-5"
                onClick={() => {
                  history("/clients");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditClientForm;
