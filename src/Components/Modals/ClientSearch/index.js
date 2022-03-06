import React, { useEffect, useState, useMemo } from "react";
import AutoComplete from "../../common/AutoComplete";
import Input from "../../common/NewInput";
import SelectBox from "../../common/NewSelectBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  // TODO validate userName for it either being a valid email or an employeeId
  accoun: yup.string(),
  account_id: yup.string(),
  country: yup.string(),
});

const ClientSearch = (props) => {
  const { setIsPanOpen, setSearchParameters, setIsSearchResult, allData } =
    props;
  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const formStaticData = useMemo(() => {
    const formStaticData = {
      accountName: [],
      accountId: [],
      country: [],
    };

    allData.data.data.data.forEach((view) => {
      view.name &&
        !formStaticData.accountName.includes(view.name) &&
        formStaticData.accountName.push(view.name);
      view.accountId &&
        !formStaticData.accountId.includes(view.accountId) &&
        formStaticData.accountId.push(view.accountId);
      view.country &&
        !formStaticData.country.includes(view.country) &&
        formStaticData.country.push(view.country);
 
    });

    return formStaticData;
  }, [allData]);

  const onSubmitSuccess = (data, event) => {
    //handle form submission ;
    console.log("in success onSubmit");
    console.log(data);
    setSearchParameters(data);
    setIsSearchResult(true);
    setIsPanOpen(false);
  };

  const { errors } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmitSuccess)}
      className="w-[100%] mx-1 my-1"
    >
      <div>
        <div className="relative my-5">
          {/* <label className="text-left font-primary font-bold text-sm  text-textlight">
            Account Name
          </label> */}
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
          {/* <label className="text-left font-primary font-bold text-sm  text-textlight">
            Account ID
          </label> */}
          <SelectBox
            name="accountId"
            errors={errors}
            label="Account ID"
            selectLabel="Account ID"
            control={control}
            items={formStaticData && formStaticData.accountId}
          />
        </div>

        <div className="relative my-5">
          {/* <label className="text-left font-primary font-bold text-sm  text-textlight">
            Country
          </label> */}
          <SelectBox
            name="country"
            errors={errors}
            label="Country"
            selectLabel="Country"
            control={control}
            items={formStaticData && formStaticData.country}
          />
        </div>
      </div>
      <div className="float-right">
        <button
          type="button"
          className="bg-white border-blackButton border rounded-[50px] px-5 py-2 mr-5 font-primary font-normal text-sm"
          onClick={() => {
            reset();
          }}
        >
          Clear Filter
        </button>
        <button
          type="submit"
          className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm"
        >
          Search Account
        </button>
      </div>
    </form>
  );
};

export default ClientSearch;
