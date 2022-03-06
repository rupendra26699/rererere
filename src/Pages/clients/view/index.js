import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import leftArrow from "../../../Assets/images/left-arrow.png";
import LoadingIndicator from "../../../Components/common/NewLoadingIndicator";
import apiCaller from "../../../Axios/apiCaller";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import { GET_ACCOUNT_BY_ID_URL } from "../../../Constants/apiConstants";
import { useMemo } from "react";
import Table from "../../../Components/common/Table";

const ViewAccount = () => {
  const history = useNavigate();
  const { id } = useParams();

  const getAccountById = () => {
    return apiCaller.get(`${GET_ACCOUNT_BY_ID_URL}/${id}`);
  };

  const { isLoading, data, isError, isRefetching } = useQuery(
    "viewAccount",
    getAccountById
  );
  
  const columns = useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "projectName",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
      },
      {
        Header: "End Date",
        accessor: "endDate",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const tabledata = useMemo(() => [
    {
      projectName: "tidc",
      startDate: "01/Dec/2021",
      endDate: "01/Dec/2022",
      status: "Pending",
    },
    {
      projectName: "tidc",
      startDate: "01/Dec/2021",
      endDate: "01/Dec/2022",
      status: "In Progress",
    },
    {
      projectName: "tidc",
      startDate: "01/Dec/2021",
      endDate: "01/Dec/2022",
      status: "Completed",
    },
  ]);

  return (
    <div className="main">
      <Navbar />
      <div className="flex justify-between">
        <Sidenav />

        <div className="w-[100%] mx-7 my-5">
          <div
            className="w-[290px] h-[48px] mb-3"
            onClick={() => history("/clients")}
          >
            <span>
              <img className="float-left w-[35px] mr-3" src={leftArrow} />
              <h1 className="font-extrabold text-[24px]">Account Details</h1>
            </span>
          </div>
          <LoadingIndicator isOpen={!!isLoading || !!isError || isRefetching } />
          {!isLoading && !isError && (
            <>
              <div className="w-[98%] h-[87px] flex justify-between items-center p-8 m-auto mb-7 rounded bg-containerBgColor shadow-sm shadow-inputComponentBorderColor border border-inputComponentBorderColor">
                <div className="mr-5">
                  <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                    Account Name
                  </h4>
                  <p className="font-bold font-primary text-lg text-inputFieldText leading-6">
                    {data.data.data.name}
                  </p>
                </div>
                <div className="mr-5">
                  <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                    Account ID
                  </h4>
                  <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                    {data.data.data.accountId}
                  </p>
                </div>
                <div className="mr-5">
                  <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                    Country
                  </h4>
                  <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                    {data.data.data.country}
                  </p>
                </div>
                <div className="mr-5">
                  <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                    Account Manager
                  </h4>
                  <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                    {data.data.data.accountManager}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <h2 className="text-left font-primary font-bold text-lg leading-6 text-inputFieldText mb-5">
                  Project Information
                </h2>
              </div>
              <Table columns={columns} data={tabledata} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAccount;
