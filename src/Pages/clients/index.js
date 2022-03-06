import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/common/Navbar";
import Sidenav from "../../Components/common/Sidebar";
import SearchInput from "../../Components/common/SearchInput";
import "react-sliding-pane/dist/react-sliding-pane.css";
import TableAction from "../../Components/common/TableAction";
import Table from "../../Components/common/Table";
import ClientSearch from "../../Components/Modals/ClientSearch";
import close from "../../Assets/images/close.svg";
import SlidingPane from "react-sliding-pane";
import { apiQueries } from "../../Axios/apiActions";
import LoadingIndicator from "../../Components/common/NewLoadingIndicator";
import { useQuery } from "react-query";
import { useRef } from "react";
import {
  FETCH_ACCOUNT_QUERY_KEY,
  SEARCH_ACCOUNTS_QUERY_KEY,
} from "../../Constants/apiConstants";
import Error from "../common/errors/Error";
import { useEffect } from "react";

const Clients = () => {
  const history = useNavigate();

  const [isPaneOpen, setIsPanOpen] = useState(false);
  const [tableFilters, setTableFilters] = useState({ filters: [] });
  const [tableData, setTableData] = useState(null);
  const [searchResultsTableData, setSearchResultsTableData] = useState(null);
  const [searchParameters, setSearchParameters] = useState(null);
  const isSearchResult = useRef(false);
  const setIsSearchResult = (value) => {
    isSearchResult.current = value;
  };

  const { isLoading, isError, data } = useQuery(
    [FETCH_ACCOUNT_QUERY_KEY, tableFilters],
    apiQueries[FETCH_ACCOUNT_QUERY_KEY],
    {
      enabled: !isSearchResult.current,
    }
  );
  const {
    isLoading: isSearchLoading,
    isError: isSearchError,
    data: searchQueryData,
    error: searchQueryError,
  } = useQuery(
    [SEARCH_ACCOUNTS_QUERY_KEY, searchParameters],
    apiQueries[SEARCH_ACCOUNTS_QUERY_KEY],
    {
      enabled: !!isSearchResult.current,
    }
  );

  useEffect(() => {
    if (!isSearchResult.current && !isLoading && !isError) {
      setTableData(data.data.data.data);
    } else {
      setTableData(null);
    }
  }, [data, isSearchResult.current, isLoading, isError]);

  useEffect(() => {
    if (isSearchResult.current && !isSearchLoading && !isSearchError) {
      setSearchResultsTableData(searchQueryData.data.data.data);
    } else {
      setSearchResultsTableData(null);
    }
  }, [searchQueryData, isSearchResult.current, isSearchLoading, isSearchError]);
  // const { id } = useParams();

  const handleView = useCallback(
    (actionData) => {
      //handle view page redirection
      history(`/viewAccounts/${actionData.accountId}`);
    },
    [data, isLoading, isError]
  );

  const handleEdit = useCallback(
    (actionData) => {
      history(`/editAccount/${actionData.accountId}`);
    },
    [data, isLoading, isError]
  );

  // var tabledata = [];

  // data?.data.data.data.map((data) => {
  //   tabledata.push(data);
  // });

  const actions = [
    { label: "View", handleClick: handleView },
    { label: "Edit", handleClick: handleEdit },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Account Name",
        accessor: "name",
      },
      {
        Header: "Account ID",
        accessor: "accountId",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Account Manager",
        accessor: "accountManager",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => (
          <TableAction actionItems={actions} rowData={props.row.values} />
          // console.log(props.row.values)
        ),
        disableSortBy: true,
      },
    ],
    [handleView, handleEdit]
  );
  // console.log("rendering client form ");
  // console.log("complete react query data is");
  // console.log(data);
  if (isError) return <Error />;
  return (
    <div className="main">
      <Navbar />
      <div className="flex justify-between">
        <Sidenav />
        <div className="w-[100%] mx-7 my-5">
          <div className="flex justify-between">
            <div className="font-extrabold text-[24px]">
              <h1 onClick={() => history("/login")}>Accounts</h1>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-blackButton h-[36px] text-white px-5 py-2 rounded-[21px] text-sm mr-5"
                onClick={() => history("/client-form")}
              >
                Create New Account
              </button>
              <SearchInput
                onClick={() => setIsPanOpen(true)}
                placeholder="Search Account"
              />
            </div>
          </div>
          <LoadingIndicator isOpen={!!isLoading || !!isError} />
          {!isSearchResult.current && !isLoading && tableData && (
            <Table columns={columns} data={tableData} />
          )}
          {isSearchResult.current &&
            !isSearchLoading &&
            !isSearchError &&
            searchResultsTableData && (
              <Table columns={columns} data={searchResultsTableData} />
            )}
        </div>
      </div>
      <SlidingPane
        className="w-35"
        overlayClassName="z-[999]"
        closeIcon={<img src={close} className="w-4" />}
        title="Account Search"
        isOpen={isPaneOpen}
        onRequestClose={() => {
          setIsPanOpen(false);
          document.body.style.overflow = "auto";
        }}
      >
        <ClientSearch
          allData={data}
          setIsPanOpen={setIsPanOpen}
          setSearchParameters={setSearchParameters}
          setIsSearchResult={setIsSearchResult}
        />
      </SlidingPane>
    </div>
  );
};

export default Clients;
