import React from "react";
import dashboard from "../../../Assets/images/dashboard.svg";
import users from "../../../Assets/images/users.svg";
import client from "../../../Assets/images/client.svg";
import projects from "../../../Assets/images/projects.svg";
import employee from "../../../Assets/images/employee.svg";
import skills from "../../../Assets/images/skills.svg";
import allocation from "../../../Assets/images/allocation.svg";
import accessManagement from "../../../Assets/images/access_management.svg"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Sidenav = () => {
  let isNavigationSidebarShown = useSelector((state) => state.newUiState.commonUi.showNavigationSidebar);
  const history = useNavigate();

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div
      //   className={`side-menu ${!isNavigationSidebarShown ? " " : "active"}`}
      className={clsx({
        "w-[20%] h-[100vh] sticky top-1  bg-sidenavBackground p-5": isNavigationSidebarShown,
        "w-[60px] h-[100vh] sticky top-1 bg-sidenavBackground p-2 ": !isNavigationSidebarShown,
      })}
    >
      <ul>
        <li>
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md hover:cursor-pointer":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary hover:cursor-pointer ":
                !isNavigationSidebarShown,
              "bg-primary text-white": splitLocation[1].includes("dashboard"),
            })}


          >
            <img
              src={dashboard}
              alt="dashboard icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary my-6 mx-2 p-0": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />{" "}
            {isNavigationSidebarShown && <p className="font-normal text-sm text-left">Dashboard</p>}
          </button>
        </li>
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary  hover:text-white p-2 rounded-md ":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
              "bg-primary text-white": splitLocation[1].includes("employee"),
            })}

            onClick={() => {
              history("/employee");
            }}
          >
            <img
              src={employee}
              alt="employees icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2 ": isNavigationSidebarShown,
              })}
            />{" "}
            {isNavigationSidebarShown && <p className="font-normal text-sm text-left">Employees</p>}
          </button>
        </li>
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
              "bg-primary text-white": splitLocation[1].includes("project"),
            })}

            onClick={() => {
              history("/projects");
            }}
          >
            <img
              src={projects}
              alt="projects icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />{" "}
            {isNavigationSidebarShown && <p className="font-normal text-sm text-left">Projects</p>}
          </button>
        </li>
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
            })}
            href="/"
          >
            <img
              src={skills}
              alt="Master skills icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />{" "}
            {isNavigationSidebarShown && (
              <p className="font-normal text-sm text-left">Master skills & attributes</p>
            )}
          </button>
        </li>
        {/* <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
            })}
            href="/"
          >
            <img
              src={users}
              alt="users icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />{" "}
            {isNavigationSidebarShown && <p className="font-normal text-sm text-left">Users</p>}
          </button>
        </li> */}
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
              "bg-primary text-white": splitLocation[1].includes("clients"),
            })}

            onClick={() => {
              history("/clients");
            }}
          >
            <img
              src={client}
              alt="Accounts icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2  ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />{" "}
            {isNavigationSidebarShown && <p className="font-normal text-sm text-left">Accounts</p>}
          </button>
        </li>
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md ":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
            })}
            href="/"
          >
            <img
              src={accessManagement}
              alt="access management icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />
            {isNavigationSidebarShown && (
              <p className="font-normal text-sm">Access Management</p>
            )}
          </button>
        </li>
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md ":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
            })}
            href="/"
          >
            <img
              src={allocation}
              alt="allocation request icon"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />
            {isNavigationSidebarShown && (
              <p className="font-normal text-sm text-left">Allocation Request Status</p>
            )}
          </button>
        </li>
        <li className="my-3">
          <button
            className={clsx({
              "flex items-center w-[100%] hover:bg-primary hover:text-white p-2 rounded-md ":
                isNavigationSidebarShown,
              "w-10 h-10 rounded-md flex  items-center hover:bg-primary":
                !isNavigationSidebarShown,
            })}
            href="/"
          >
            <img
              src={allocation}
              alt="Reports"
              className={clsx({
                "w-6 h-6 hover:bg-primary  my-6 mx-2 ": !isNavigationSidebarShown,
                "w-5 mr-2": isNavigationSidebarShown,
              })}
            />
            {isNavigationSidebarShown && (
              <p className="font-normal text-sm">Reports</p>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;

