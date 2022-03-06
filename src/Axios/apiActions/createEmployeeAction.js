import apiCaller from "../apiCaller";

import {
	CREATE_EMPLOYEE_URL,
	FETCH_CREATE_EMPLOYEE_STATIC_DATA_URL,
	FETCH_ALL_PROJECT_MANAGERS_URL,

} from "../../Constants/apiConstants";
// Post data for creating a project

async function createEmployee(formData) {
	let createdEmployee = await apiCaller.post(CREATE_EMPLOYEE_URL, formData)
	if (createdEmployee.data.code !== 0) {
		throw new Error("The server returned a status 200 response but with code value !== 0  indicating there has been an error");
	}
	return createdEmployee
}

async function getCreateEmployeeStaticData() {
	let staticData = await apiCaller.get(FETCH_CREATE_EMPLOYEE_STATIC_DATA_URL);
	return staticData;
}


async function getAllProjectManagers() {
	let projectManagers = await apiCaller.get(FETCH_ALL_PROJECT_MANAGERS_URL);
	return projectManagers
}

export { createEmployee, getCreateEmployeeStaticData, getAllProjectManagers };
