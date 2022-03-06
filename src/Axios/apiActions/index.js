import {
  FETCH_ALL_PROJECTS_QUERY_KEY,
  CREATE_NEW_PROJECT_MUTATION_KEY,
  FETCH_PROJECT_CATEGORY_FOR_CREATE_NEW_PROJECT,
  FETCH_PROJECT_TYPE_FOR_CREATE_NEW_PROJECT,
  FETCH_BILLABILITY_STATUS_FOR_CREATE_NEW_PROJECT,
  FETCH_PRICING_MODEL_FOR_CREATE_NEW_PROJECT,
  FETCH_ACCOUNT_NAME_FOR_CREATE_NEW_PROJECT,
  FETCH_PROJECT_MANAGER_FOR_CREATE_NEW_PROJECT,
  FETCH_PROJECT_STATUS_FOR_CREATE_NEW_PROJECT,
  FETCH_DOMAIN_FOR_CREATE_NEW_PROJECT,
  FETCH_TECHNOLOGY_STACK_FOR_CREATE_NEW_PROJECT,
  FETCH_ALL_EMPLOYEES_QUERY_KEY,
  FETCH_CREATE_EMPLOYEE_STATIC_DATA,
  SEARCH_EMPLOYEE_QUERY_KEY,
  FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY,
  CREATE_NEW_EMPLOYEE_MUTATION_KEY,
  FETCH_CREATE_PROJECT_STATIC_DATA,
  SEARCH_PROJECTS_QUERY_KEY,
  SEARCH_ACCOUNTS_QUERY_KEY,
  FETCH_ALL_EMPLPOYEES_POST_QUERY_KEY,
  FETCH_ALL_PROJECTS_POST_QUERY_KEY,
  FETCH_ACCOUNT_QUERY_KEY,
  CREATE_ACCOUNT_MUTATION_KEY,
  EDIT_ACCOUNT_MUTATION_KEY,
  FETCH_ACCOUNT_ID_KEY,
  FETCH_COUNTRY_DATA_KEY,
  GET_ACCOUNT_BY_ID_KEY,
} from "../../Constants/apiConstants";

import {
  getAllProjects,
  getAllProjectsPost,
  searchProjects,
} from "./listProjectsActions";

import {
  createProject,
  getProjectBillabilityStatusForCreateNewProject,
  getProjectsStaticData,
} from "./createProjectActions";
import {
  getAllEmployeePost,
  getAllEmployees,
  searchEmployees,
} from "./listEmployeeAction";
import {
  getCreateEmployeeStaticData,
  createEmployee,
  getAllProjectManagers,
} from "./createEmployeeAction";
import { getAccountId, getAllAccounts,searchAccounts } from "./listAccountsAction";
import { createAccount } from "./createAccount";
import { editAccount } from "./editAccountAction";
import { getAllCountry } from "./getCountriesAction";

const apiQueries = {
  [FETCH_ALL_PROJECTS_QUERY_KEY]: getAllProjects,
  [FETCH_ALL_PROJECTS_POST_QUERY_KEY]: getAllProjectsPost,
  [FETCH_BILLABILITY_STATUS_FOR_CREATE_NEW_PROJECT]:
    getProjectBillabilityStatusForCreateNewProject,
  [FETCH_ALL_EMPLOYEES_QUERY_KEY]: getAllEmployees,
  [FETCH_ALL_EMPLPOYEES_POST_QUERY_KEY]: getAllEmployeePost,
  [FETCH_CREATE_PROJECT_STATIC_DATA]: getProjectsStaticData,
  [SEARCH_EMPLOYEE_QUERY_KEY]: searchEmployees,
  [SEARCH_PROJECTS_QUERY_KEY]: searchProjects,
  [SEARCH_ACCOUNTS_QUERY_KEY] : searchAccounts,
  [FETCH_ACCOUNT_QUERY_KEY]: getAllAccounts,
  [FETCH_ACCOUNT_ID_KEY]: getAccountId,
  [FETCH_COUNTRY_DATA_KEY]: getAllCountry,

  //create employee

  [FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY]: getAllProjectManagers,
  [FETCH_CREATE_EMPLOYEE_STATIC_DATA]: getCreateEmployeeStaticData,
};

const apiMutations = {
  [CREATE_NEW_PROJECT_MUTATION_KEY]: createProject,

  // create Employee
  [CREATE_NEW_EMPLOYEE_MUTATION_KEY]: createEmployee,
  // create account
  [CREATE_ACCOUNT_MUTATION_KEY]: createAccount,

  [EDIT_ACCOUNT_MUTATION_KEY]: editAccount,
};

export { apiMutations, apiQueries };
