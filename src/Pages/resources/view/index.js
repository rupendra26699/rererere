import React, { useMemo } from "react";
import leftArrow from "../../../Assets/images/left-arrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import EmployeeTable from "../employeeTable";

const View = () => {
	const history = useNavigate();
  const location = useLocation();

	const newColumns = useMemo(
		() => [
			{
				Header: "Project Name",
				accessor: "proName",
			},
			{
				Header: " Primary Skills",
				accessor: "skills",
			},
			{
				Header: "Client Name",
				accessor: "clientName",
			},
			{
				Header: "Actual Start Date",
				accessor: "startDate",
			},
			{
				Header: "Actual End Date",
				accessor: "endDate",
			},
			{
				Header: " Role",
				accessor: "role",
			},
			{
				Header: "% Allocated",
				accessor: "allocated",
			},
		],
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Project Name",
				accessor: "proName",
			},
			{
				Header: " Primary Skills",
				accessor: "skills",
			},
			{
				Header: "Client Name",
				accessor: "clientName",
			},
			{
				Header: "Actual Start Date",
				accessor: "startDate",
			},
			{
				Header: "Actual End Date",
				accessor: "endDate",
			},
			{
				Header: " Role",
				accessor: "role",
			},
		],
		[]
	);

	const newData = useMemo(
		() => [
			{
				proName: "Purbasa QMS",
				skills: "Design",
				clientName: "Purbasa QMs",
				startDate: "01/ May /2022",
				endDate: "22/ Dec /2022",
				role: "Employee",
				allocated: "25%",
			},
			{
				proName: "TIDC",
				skills: "Design",
				clientName: "TIDC",
				startDate: "01/ May /2022",
				endDate: "18/ Dec /2022",
				role: "Employee",
				allocated: "50%",
			},
		],
		[]
	);

	const data = useMemo(
		() => [
			{
				proName: "SOUCS",
				skills: "Design",
				clientName: "SOUCS",
				startDate: "01/ Feb /2019",
				endDate: "22/ Dec /2020",
				role: "Employee",
			},
			{
				proName: "IMM",
				skills: "Design",
				clientName: "IMM",
				startDate: "01/ May /2019",
				endDate: "18/ Dec /2020",
				role: "Employee",
			},
			{
				proName: "Telos ID",
				skills: "Design",
				clientName: "Telos ID",
				startDate: "01/ May /2019",
				endDate: "18/ Dec /2022",
				role: "Employee",
			},
		],
		[]
	);

	return (
		<div className="main">
			<Navbar />
			<div className="flex justify-between">
				<Sidenav />
				<div className="w-[100%] mx-7 my-5">
					<div className="flex justify-between">
						<div
							className="w-[290px] h-[48px] mb-3"
							onClick={() => history("/employee")}>
							<span className="hover:cursor-pointer">
								<img className="float-left w-[35px] mr-3" src={leftArrow} />
								<h1 className="font-extrabold text-[24px]">Employee Details</h1>
							</span>
						</div>
						<div>
							<button
								type="button"
								className="bg-blackButton border-0 text-white rounded-[22px]  px-5 py-2 mr-5 font-primary font-normal text-sm"
								onClick={() => history("/employee")}>
								Request Allocation
							</button>
						</div>
					</div>

					<div className="flex justify-center shadow-sm shadow-inputComponentBorderColor p-5 border border-inputComponentBorderColor rounded h-[330px] w-[800px] bg-containerBgColor mb-7">
						<div className="h-[100%] w-[300px]">
							{/* <div> <img src= { employee } /></div> */}
						</div>
						<div className="h-[100%] w-[400px]">
							<div>
								<h3 className="font-primary font-bold text-sm">Soumen Dey</h3>
								<div className="mb-[15px] text-black">(E25236)</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">Designation</h4>
								<div className="mb-[15px] text-black">
									Principal Creative Visualiser{" "}
								</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">Phone Number</h4>
								<div className="mb-[15px] text-black">9467897653</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">
									Completed Projects
								</h4>
								<div className="mb-[15px] text-black">3</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">Reporting To</h4>
								<div className="mb-[15px] text-black">Sumanta Mitra</div>
							</div>
						</div>
						<div className="h-[100%] w-[500px]">
							<div>
								<h4 className="font-primary font-bold text-sm">Email ID</h4>
								<div className="mb-[15px] text-black">
									soumen.dey@optimizeitsystems.com
								</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">
									Primary Skills
								</h4>
								<div className="mb-[15px] text-black">Design</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">
									Total Experience(as on Date)
								</h4>
								<div className="mb-[15px] text-black">10 Years 03 Months</div>
							</div>
							<div>
								<h4 className="font-primary font-bold text-sm">
									Ongoing Projects
								</h4>
								<div className="mb-[15px] text-black">2</div>
								<div>
									<h4 className="font-primary font-bold text-sm">Resume</h4>
									<div className="flex justify-between">
										<a href="" className="list-none text-fileuploadButton">
											soumen-resume.doc
										</a>
										<button className="w-[120px] h-[30px] p-1 border bg-white text-center border-downloadButton rounded-[50px] ">
											Download
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-5">
						<h2 className="text-lg font-primary font-bold text-left mb-5">
							Present Allocation
						</h2>
						<EmployeeTable columns={newColumns} data={newData} />
					</div>
					<div className="mb-5">
						<h2 className="text-lg font-primary font-bold text-left mb-5">
							Project History
						</h2>
						<EmployeeTable columns={columns} data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default View;
