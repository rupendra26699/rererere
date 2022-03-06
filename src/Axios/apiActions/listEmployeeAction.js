import {
	SEARCH_EMPLOYEE_URL,
	VIEW_EMPLOYEES_LIST_POST_URL,
	VIEW_EMPLOYEES_LIST_URL,
} from "../../Constants/apiConstants";
import apiCaller from "../apiCaller";

async function getAllEmployees() {
	//TODO use get for calling the api
	let allEmployees = await apiCaller.get(VIEW_EMPLOYEES_LIST_URL);
	return allEmployees;
}

async function getAllEmployeePost(data) {
	let allEmployees = await apiCaller.post(
		VIEW_EMPLOYEES_LIST_POST_URL,
		data.queryKey[1]
	);
	// TODO remove this stubbed data
	return allEmployees;
}

async function searchEmployees(data) {
	let allEmployees = await apiCaller.post(
		SEARCH_EMPLOYEE_URL,
		data.queryKey[1]
	);
	// TODO remove this stubbed data
	return allEmployees;
}

export { getAllEmployees, searchEmployees, getAllEmployeePost };
