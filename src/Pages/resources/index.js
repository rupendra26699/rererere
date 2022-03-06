import React, { useEffect, useMemo, useState, useRef } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Navbar from "../../Components/common/Navbar";
import SearchInput from "../../Components/common/SearchInput";
import Sidenav from "../../Components/common/Sidebar";
import EmployeeSearch from "../../Components/Modals/EmployeeSearch";
import close from "../../Assets/images/close.svg";
import TableAction from "../../Components/common/TableAction";
import Table from "../../Components/common/Table";
import {
	FETCH_ALL_EMPLOYEES_QUERY_KEY,
	FETCH_ALL_EMPLPOYEES_POST_QUERY_KEY,
	SEARCH_EMPLOYEE_QUERY_KEY,
} from "../../Constants/apiConstants";
import { apiQueries } from "../../Axios/apiActions";
import LoadingIndicator from "../../Components/common/NewLoadingIndicator";
import Error from "../common/errors/Error";
import { DevTool } from "@hookform/devtools";
const createFullName = (data) => {
	const newData = [];
	data.forEach((view) => {
		newData.push({
			fullName: `${view.firstName || ""} ${view.middleName || ""} ${
				view.lastName || ""
			}`,
			...view,
		});
	});
	return newData;
};

const Employee = () => {
	const history = useNavigate();
	const isSearchResult = useRef(false);
	//TODO Determine when to set this value as false
	const setIsSearchResult = (value) => {
		isSearchResult.current = value;
	};
	const [isPaneOpen, setIsPanOpen] = useState(false);
	const [tableFilters, setTableFilters] = useState({ filters: [] });

	const [searchResultsTableData, setSearchResultsTableData] = useState(null);
	const [tableData, setTableData] = useState(null);
	const [searchParameters, setSearchParameters] = useState(null);

	const { isLoading, isError, data, error } = useQuery(
		[FETCH_ALL_EMPLPOYEES_POST_QUERY_KEY, tableFilters],
		apiQueries[FETCH_ALL_EMPLPOYEES_POST_QUERY_KEY],
		{ enabled: !isSearchResult.current }
	);

	const filterOptions =
		!isLoading && !isError ? [...data.data.data.filters] : [];
	console.log("filterOptions", filterOptions);

	const {
		isLoading: isSearchLoading,
		isError: isSearchError,
		data: searchQueryData,
		error: searchQueryError,
	} = useQuery(
		[SEARCH_EMPLOYEE_QUERY_KEY, searchParameters],
		apiQueries[SEARCH_EMPLOYEE_QUERY_KEY],
		{
			enabled: !!isSearchResult.current,
		}
	);

	const handleView = (actionData) => {
		//handle view page redirection
		history("/employee/view", { state: { id: actionData.employeeId } });
	};
	const handleEdit = () => {
		//handle edit page redirection
	};
	const handleDelete = () => {
		//handle delete action
	};
	const actions = [
		{ label: "View", handleClick: handleView },
		{ label: "Edit", handleClick: handleEdit },
		{ label: "Delete", handleClick: handleDelete },
	];

	const columns = useMemo(
		() => [
			{
				Header: "Employee ID",
				accessor: "employeeId",
				Cell: (props) => {
					return props.value !== "null" ? props.value : "-";
				},
			},
			{
				Header: "Name",
				accessor: "fullName",
				Cell: (props) => {
					return props.value !== "null" ? props.value : "-";
				},
			},
			{
				Header: "Primary Skills",
				accessor: "primarySkill",
				Cell: (props) => {
					return props.value !== "null" ? props.value : "-";
				},
			},
			{
				Header: "Email Address",
				accessor: "email",
				Cell: (props) => {
					return props.value !== "null" ? props.value : "-";
				},
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: (props) => (
					<TableAction actionItems={actions} rowData={props.row.values} />
				),
				disableSortBy: true,
			},
		],
		[]
	);

	useEffect(() => {
		if (!isSearchResult.current && !isLoading && !isError) {
			setTableData(createFullName(data.data.data.data));
		} else {
			setTableData(null);
		}
	}, [data, isSearchResult.current, isLoading, isError]);

	useEffect(() => {
		if (isSearchResult.current && !isSearchLoading && !isSearchError) {
			setSearchResultsTableData(createFullName(searchQueryData.data.data.data));
		} else {
			setSearchResultsTableData(null);
		}
	}, [searchQueryData, isSearchResult.current, isSearchLoading, isSearchError]);

	// TODO implement an error notification

	if (!isSearchResult.current && isError) return <Error />;
	if (isSearchResult.current && isSearchError) return <Error />;

	return (
		<div className="main">
			<Navbar />
			<div className="flex justify-between">
				<Sidenav />
				<div className="w-[100%] mx-7 my-5">
					<div className="flex justify-between mb-5">
						<div className="font-extrabold text-[24px]">
							<h1 onClick={() => history("/login")}>Employees</h1>
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								className="bg-blackButton h-[36px] text-white px-5 py-2 rounded-[21px] text-sm mr-5"
								onClick={() => history("/create-employee")}>
								Create New Employee
							</button>
							<SearchInput
								onClick={() => setIsPanOpen(true)}
								placeholder="Search Employee"
							/>
						</div>
					</div>
					<LoadingIndicator isOpen={!!isLoading || !!isSearchLoading} />
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
				closeIcon={
					<img src={close} className="w-4" />
					// <div className="close-btn">
					//   <object data={close} width="18" height="18" />
					// </div>
				}
				title="Employee Search"
				isOpen={isPaneOpen}
				onRequestClose={() => {
					setIsPanOpen(false);
					document.body.style.overflow = "auto";
				}}>
				<EmployeeSearch
					allData={data}
					setIsPanOpen={setIsPanOpen}
					setSearchParameters={setSearchParameters}
					setIsSearchResult={setIsSearchResult}
				/>
			</SlidingPane>
		</div>
	);
};

export default Employee;
