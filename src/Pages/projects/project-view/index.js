import React ,{ useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/common/Navbar";
import Sidenav from "../../../Components/common/Sidebar";
import leftArrow from "../../../Assets/images/left-arrow.png";
import Table from "../../../Components/common/Table";
import TableAction from "../../../Components/common/TableAction";
import CustomModal from "../../../Components/common/CustomModal";
import AllocationExtension from "../../../Components/Modals/allocationExtension";

const ProjectView = () => {
  const history = useNavigate();
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const handleView = () => {
    //handle view page redirection
    history("/employee");
  };

  const actions = [{ label: "View", handleClick: handleView }];
  const columns = useMemo(
    () => [
      {
        Header: "Employee Name",
        accessor: "empName",
      },
      {
        Header: "Employee Id",
        accessor: "empId",
      },
      {
        Header: "Skill Set",
        accessor: "skillSet",
      },
      {
        Header: "Start Date",
        accessor: "startdate",
      },
      {
        Header: "End Date",
        accessor: "enddate",
      },
      {
        Header: "Allocation Type",
        accessor: "allocationType",
      },
      {
        Header: "% Allocated",
        accessor: "allocated",
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
        empName: "Shaban",
        empId: "E2081",
        skillSet: "Visual Design",
        startdate: "01/Dec/2021",
        enddate: "01/Dec/2022",
        allocationType: "Billable",
        allocated: "13",
      },
      {
        empName: "Akarsha",
        empId: "E2043",
        skillSet: "Infra",
        startdate: "01/Feb/2021",
        enddate: "01/Feb/2022",
        allocationType: "Billable",
        allocated: "15",
      },
      {
        empName: "Mukesh Kumar",
        empId: "E9439",
        skillSet: "UI",
        startdate: "01/Mar/2021",
        enddate: "01/Mar/2022",
        allocationType: "Non-Billable",
        allocated: "16",
      },
      {
        empName: "Shaban",
        empId: "E2081",
        skillSet: "Visual Design",
        startdate: "01/Feb/2021",
        enddate: "01/Feb/2022",
        allocationType: "Billable",
        allocated: "13",
      },
      {
        empName: "Akarsha",
        empId: "E2043",
        skillSet: "Infra",
        startdate: "01/Jan/2021",
        enddate: "01/Jan/2022",
        allocationType: "Billable",
        allocated: "15",
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
              onClick={() => history("/projects")}
            >
              <span className="hover:cursor-pointer">
                <img className="float-left w-[35px] mr-3" src={leftArrow} />
                <h1 className="font-extrabold text-[24px]">Projects Details</h1>
              </span>
            </div>
            <div>
              <button
                type="button"
                className="bg-blackButton text-white px-5 h-[36px] py-2 rounded-[21px] text-sm font-primary mr-5"
                onClick={() => history("/employee")}
              >
                Request Allocation
              </button>
            </div>
          </div>
          <div className="w-[100%] h-[202px] mb-5">
            <div className="flex items-center justify-between h-[70px] p-3 rounded-t-lg bg-cardTop">
              <div className="mr-5">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Project Name
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  TIDC
                </p>
              </div>
              <div className="mr-5">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Project ID
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  PRJ-302
                </p>
              </div>
              <div className="mr-5">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Full Project Name
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  Tripura Industrial Development corporation
                </p>
              </div>
              <div className="mr-5">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Account Name
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  TIDC
                </p>
              </div>
              <div className="mr-5">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Status
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  In Progress
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center h-[132px] p-3 rounded-b-lg border shadow-sm border-cardTop bg-white">
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Actual Start Date
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  01/11/2021
                </p>{" "}
              </div>
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Actual Start Date ID
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  01/03/2022
                </p>
              </div>
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Project Manager
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  Subhash Mishra
                </p>
              </div>
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Assigned Employee
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  3
                </p>
              </div>
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Pricing Model
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  Fixed
                </p>
              </div>
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Billablity Status
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  Billable
                </p>
              </div>
              <div className="mr-4">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Project Type
                </h4>
                <p className="font-normal font-primary text-sm text-inputFieldText leading-6">
                  External
                </p>
              </div>
              <div className="mr-4 mt-2">
                <h4 className="font-primary font-semibold text-sm leading-[24px] text-blackButton">
                  Refrence Link
                </h4>
                <a
                  href="javascript:void(0)"
                  className="font-normal font-primary text-sm text-fileuploadButton leading-6"
                >
                  www.inadev.net/wiki/display/OH/OIT+Internal+Tools
                </a>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <h2 className="text-left font-primary font-bold text-lg leading-6 text-inputFieldText mb-5">
              Allocated Employee List
            </h2>
            <div className="float-right mr-5 mb-4">
              <button
                className="border w-[184px] h-[43px] border-fileuploadButton rounded-[25px] p-2 text-center text-fileuploadButton"
                onClick={() => {
                  setIsSkillModalOpen(true);
                }}
              >
                Allocation Extension
              </button>
            </div>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
      <CustomModal
        show={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        size="w-[35%] h-[60%]"
        modalComponent={<AllocationExtension />}
        title="Allocation Extension"
      />
    </div>
  );
};

export default ProjectView;
