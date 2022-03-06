import React, { useMemo } from "react";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import leftArrow from "../../../Assets/images/left-arrow.png";
import { useNavigate } from "react-router-dom";
import TableAction from "../../../Components/common/TableAction";
import Table from "../../../Components/common/Table";

const PendingApproval = () => {
	const history = useNavigate();

	const handleView = () => {
		//handle view page redirection
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
				Header: "Short Project Name",
				accessor: "spName",
			},
			{
				Header: "Client Name",
				accessor: "clientName",
			},
			{
				Header: "Project Manager",
				accessor: "projectManager",
			},
			{
				Header: "Created Date",
				accessor: "createdDate",
			},
			{
				Header: "Actual Start Date",
				accessor: "actualStartDate",
			},
			{
				Header: "Actual End Date",
				accessor: "actualEndDate",
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

	const data = useMemo(
		() => [
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
			{
				spName: "TIDC",
				clientName: "TIDC",
				projectManager: "Prasenjit Gupta",
				createdDate: "01/Feb/2021",
				actualStartDate: "01/Feb/2021",
				actualEndDate: "01/Feb/2022",
			},
		],
		[]
	);
	return (
		<div>
			<Navbar />
			<div className="flex justify-between">
				<Sidenav />
				<div className="w-[100%] mx-7 my-5">
					<div className="w-[290px] h-[48px] mb-5" onClick={() => history("/projects")}>
						<span  className="hover:cursor-pointer">
							<img className="float-left w-[35px] mr-3" src={leftArrow} />
							<h1 className="font-extrabold text-[24px]">Pending Approval</h1>
						</span>
					</div>
					<Table columns={columns} data={data} />
				</div>
			</div>
		</div>
	);
};

export default PendingApproval;
