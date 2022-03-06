import React, { useEffect, useState } from "react";
import { useNavigate ,Navigate } from "react-router-dom";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import leftArrow from "../../../Assets/images/left-arrow.png";
import Input from "../../../Components/common/NewInput";
import SelectBox from "../../../Components/common/newSelect";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiQueries } from "../../../Axios/apiActions";
import * as yup from "yup";


import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  CREATE_ACCOUNT_MUTATION_KEY,
  FETCH_ACCOUNT_QUERY_KEY,
  FETCH_COUNTRY_DATA_KEY,
} from "../../../Constants/apiConstants";
import { apiMutations } from "../../../Axios/apiActions";
// import { CREATE_ACCOUNT_URL } from "../../../Constants/apiConstants";

const schema = yup.object({
  // TODO validate userName for it either being a valid email or an employeeId
  name: yup.string().required("This field is required "),
  // accountId: yup.string().required("This field is required"),
  country: yup.string().required("This field is required"),
  accountManager: yup.string().required("This field is required"),
});

const ClientsForm = () => {
  const history = useNavigate();

  // const {
  //   data: id,
  //   isLoading,
  //   isError,
  // } = useQuery(FETCH_ACCOUNT_ID_KEY, apiQueries[FETCH_ACCOUNT_ID_KEY]);

  // const accountId = id?.data?.data;
  // console.log(accountId)
  const [isCreateAccount, setIsCreateAccountSuccessful] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data) => {
      return apiMutations[CREATE_ACCOUNT_MUTATION_KEY](data);
    },
    {
      onSuccess: () => {
				queryClient.invalidateQueries(FETCH_ACCOUNT_QUERY_KEY);
				setIsCreateAccountSuccessful(true);
			},
    }
  );

  const { data: country, isLoading } = useQuery(
    FETCH_COUNTRY_DATA_KEY,
    apiQueries[FETCH_COUNTRY_DATA_KEY]
  );

  const { register, handleSubmit, formState, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitSuccess = (data, event) => {
    mutate(data);
  };
  const { errors } = formState;


  const countryList = [];

  country?.data?.data?.map((items) => {
    countryList.push({ label: items.country, value: items.country });
  });

if (isCreateAccount) return <Navigate to="/clients" />;
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

              <h1 className="font-extrabold text-[24px]">Create New Account</h1>
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
              {/* <div className="w-[100%] mr-5">
                <label className="text-left font-primary font-semibold text-textlight text-sm">
                  Account ID
                </label>
                <Input
                  type="text"
                  {...register("accountId")}
                  readonly={true}
                  errors={errors}
                  disabled={true}
                />
              </div> */}
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
            </div>
            <div className="flex justify-between mb-5">
              <div className="w-[75%] mr-5">
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
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ClientsForm;
