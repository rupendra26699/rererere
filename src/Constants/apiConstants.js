export const BASE_URL = process.env.REACT_APP_API_SERVER;
//export const BASE_URL = "https://skill-portal-dev.inadev.net"
export const API_VERSION = "api";

export const LOGIN_URL = `/auth/login/userlogin`;

export const PASSWORD_RESET_URL = `/auth/reset/password`;

export const CHANGE_PASSWORD_URL = `/auth/change/password`;

export const FORGET_PASSWORD_URL = `/auth/forget/password`;

// Project Service

export const VIEW_PROJECT_LIST_URL = `/project/getAllProject`;

export const CREATE_PROJECT_URL = `/project/createProject`;

export const SEARCH_PROJECT_URL = `/project/searchProject`;

export const UPDATE_PROJECT_URL = `/project/updateProject`;
export const FETCH_CREATE_PROJECT_STATIC_DATA_URL = "project/getAllStaticData";

// Employee Service

export const VIEW_EMPLOYEES_LIST_URL = "/employee/getAllEmployee";
export const VIEW_EMPLOYEES_LIST_POST_URL = "/employee/getAllEmployeeFilterList";
export const CREATE_EMPLOYEE_URL = "/employee/createEmployee";
export const FETCH_CREATE_EMPLOYEE_STATIC_DATA_URL =
	"employee/getAllEmployeeStaticData";
export const SEARCH_EMPLOYEE_URL = "employee/searchEmployee";

export const FETCH_ALL_PROJECT_MANAGERS_URL =
	"/employee/getAllProjectManangers";

export const CHECK_IF_EMPLOYEE_EMAIL_IS_AVAILABLE =
	"/employee/checkEmployeeEmail/";

export const CHECK_IF_EMPLOYEE_ID_IS_AVAILABLE = "/employee/checkEmployeeId/";

//Accounts Service

export const VIEW_ACCOUNT_LIST_URL = `/project/getAllAccount`;

export const CREATE_ACCOUNT_URL = `/project/createAccount`;

export const EDIT_ACCOUNT_URL = `/project/editAccount`;

export const GET_ACCOUNT_BY_ID_URL = `/project/getAccount`;

export const GET_ACCOUNT_ID_URL = `/project/getAccountId`;

export const GET_COUNTRY_DATA_URL =`/project/getAllCountry`;

export const SEARCH_ACCOUNTS_URL = `/project/searchAccount`

// Action keys


export const FETCH_ALL_PROJECTS_QUERY_KEY = "viewProjects";
export const FETCH_ALL_PROJECTS_POST_QUERY_KEY = "viewProjectsPost"

export const FETCH_ALL_EMPLOYEES_QUERY_KEY = "viewEmployees";
export const FETCH_ALL_EMPLPOYEES_POST_QUERY_KEY = "viewEmployeesPost";
export const SEARCH_EMPLOYEE_QUERY_KEY = "searchEmployee";
export const FETCH_ACCOUNT_QUERY_KEY = "viewAccounts";
export const GET_ACCOUNT_BY_ID_KEY = "getAccount";
export const FETCH_ACCOUNT_ID_KEY = "getAccountId";
export const FETCH_COUNTRY_DATA_KEY ="getCountry"
export const FETCH_ALL_PROJECT_MANAGERS_QUERY_KEY = "fetchAllProjectManagers";
export const SEARCH_PROJECTS_QUERY_KEY = "searchProjects";
export const SEARCH_ACCOUNTS_QUERY_KEY = "searchAccounts";

//Mutation Keys
export const CREATE_NEW_PROJECT_MUTATION_KEY = "createProject";
export const CREATE_NEW_EMPLOYEE_MUTATION_KEY = "createEmployees";
export const CREATE_ACCOUNT_MUTATION_KEY = "createAccount";
export const EDIT_ACCOUNT_MUTATION_KEY = "editAccount";

// Create Project static data api key
export const FETCH_CREATE_PROJECT_STATIC_DATA = "fetchCreateProjectStaticData";

export const FETCH_PROJECT_CATEGORY_FOR_CREATE_NEW_PROJECT =
	"fetchProductCategoryForCreateNewProject";
export const FETCH_PROJECT_TYPE_FOR_CREATE_NEW_PROJECT =
	"fetchProductTypeForCreateNewProject";
export const FETCH_BILLABILITY_STATUS_FOR_CREATE_NEW_PROJECT =
	"fetchBillabilityStatusForCreateNewProject";
export const FETCH_PRICING_MODEL_FOR_CREATE_NEW_PROJECT =
	"fetchPricingModelForCreateNewProject";
export const FETCH_ACCOUNT_NAME_FOR_CREATE_NEW_PROJECT =
	"fetchAccountNameForCreateNewProject";
export const FETCH_PROJECT_MANAGER_FOR_CREATE_NEW_PROJECT =
	"fetchProjectManagerForCreateNewProject";
export const FETCH_PROJECT_STATUS_FOR_CREATE_NEW_PROJECT =
	"fetchProductStatusForCreateNewProject";
export const FETCH_DOMAIN_FOR_CREATE_NEW_PROJECT =
	"fetchDomainForCreateNewProject";
export const FETCH_TECHNOLOGY_STACK_FOR_CREATE_NEW_PROJECT =
	"fetchTechnologyStatckForCreateNewProject";

// Create Employee Static Data API Key

export const FETCH_CREATE_EMPLOYEE_STATIC_DATA =
	"fetchCreateEmployeeStaticData";
