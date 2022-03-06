import React, { useEffect, useMemo, useRef, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import SearchInput from "../../Components/common/SearchInput";
import Sidenav from "../../Components/common/Sidebar";
import ProjectSearch from "../../Components/Modals/ProjectSearch";
import close from "../../Assets/images/close.svg";
import TableAction from "../../Components/common/TableAction";
import Table from "../../Components/common/Table";
import { apiQueries } from "../../Axios/apiActions";
import LoadingIndicator from "../../Components/common/NewLoadingIndicator";
import { format, parseISO } from "date-fns";

import { useQuery } from "react-query";
import {
	FETCH_ALL_PROJECTS_POST_QUERY_KEY,
	FETCH_ALL_PROJECTS_QUERY_KEY,
	SEARCH_PROJECTS_QUERY_KEY,
} from "../../Constants/apiConstants";
import Error from "../common/errors/Error";

const Projects = () => {
	const history = useNavigate();

	const isSearchResult = useRef(false);
	const setIsSearchResult = (value) => {
		isSearchResult.current = value;
	};

	const [tableFilters, setTableFilters] = useState({ filters: [] });
	const [isPaneOpen, setIsPanOpen] = useState(false);
	const [tableData, setTableData] = useState(null);
	const [searchResultsTableData, setSearchResultsTableData] = useState(null);
	const [searchParameters, setSearchParameters] = useState(null);
	// const { isLoading, isError, data, error } = useQuery(
	// 	FETCH_ALL_PROJECTS_QUERY_KEY,
	// 	apiQueries[FETCH_ALL_PROJECTS_QUERY_KEY],
	// 	{
	// 		enabled: !isSearchResult.current,
	// 	}
	// );

	const { isLoading, isError, data, error } = useQuery(
		[FETCH_ALL_PROJECTS_POST_QUERY_KEY, tableFilters],
		apiQueries[FETCH_ALL_PROJECTS_POST_QUERY_KEY],
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
		[SEARCH_PROJECTS_QUERY_KEY, searchParameters],
		apiQueries[SEARCH_PROJECTS_QUERY_KEY],
		{
			enabled: !!isSearchResult.current,
		}
	);

	const handleView = () => {
		//handle view page redirection
		history("/view-projects");
	};
	const handleEdit = () => {
		//handle edit page redirection
	};
	const actions = [
		{ label: "View", handleClick: handleView },
		{ label: "Edit", handleClick: handleEdit },
	];
	const columns = useMemo(
		() => [
			{
				Header: "Project ID",
				accessor: "projectId",
			},
			{
				Header: "Project Name",
				accessor: "shortName",
			},
			{
				Header: "Account Name",
				accessor: "accountName",
			},
			{
				Header: "Actual Start Date",
				accessor: "actualStartDate",
				Cell: ({ value }) => {
					let parsedDate = parseISO(value);
					if (parsedDate === "Invalid Date") return "Invalid Date";
					return format(parseISO(value), "dd-MM-yyyy");
				},
			},
			{
				Header: "Planned End Date",
				accessor: "plannedEndDate",
				Cell: ({ value }) => {
					let parsedDate = parseISO(value);
					if (parsedDate === "Invalid Date") return "Invalid Date";
					return format(parseISO(value), "dd-MM-yyyy");
				},
			},
			{
				Header: "Status",
				accessor: "bstatus",
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: (props) => <TableAction actionItems={actions} />,
				disableSortBy: true,
			},
		],
		[]
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

	// TODO handle error case with a notification
	if (isError) return <Error />;

	return (
		<div>
			<Navbar />
			<div className="flex justify-between">
				<Sidenav />
				<div className="w-[100%] mx-7 my-5">
					<div className="flex justify-between mb-5">
						<div className="font-extrabold text-[24px]">
							<h1 onClick={() => history("/login")}>Projects</h1>
						</div>
						<div className="flex justify-between">
							<button
								type="button"
								className="bg-blackButton text-white px-5 h-[36px] py-2 rounded-[21px] text-sm font-primary mr-5"
								onClick={() => history("/create-project")}>
								Create a New Project
							</button>
							<SearchInput
								placeholder="Search Projects"
								onClick={() => setIsPanOpen(true)}
							/>
							<button
								type="button"
								className="bg-white border border-black w-[160px] h-[36px] font-primary text-black px-5 py-2 rounded-[21px] text-sm mr-5"
								onClick={() => history("/pending-approval")}>
								Pending Approval
							</button>
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
				title="Project Search"
				isOpen={isPaneOpen}
				onRequestClose={() => {
					setIsPanOpen(false);
					document.body.style.overflow = "auto";
				}}>
				<ProjectSearch
					allData={data}
					setIsPanOpen={setIsPanOpen}
					setSearchParameters={setSearchParameters}
					setIsSearchResult={setIsSearchResult}
				/>
			</SlidingPane>
		</div>
	);
};

export default Projects;
