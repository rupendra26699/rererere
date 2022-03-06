import apiCaller from "../apiCaller";

import {
	CREATE_PROJECT_URL,
	FETCH_CREATE_PROJECT_STATIC_DATA_URL,
} from "../../Constants/apiConstants";
// Post data for creating a project

async function createProject(formData) {
	let createdProject = await apiCaller.post(CREATE_PROJECT_URL, formData);
	if (createdProject.data.code !== 0) {
		throw new Error(
			"The server returned a status 200 response but with code value !== 0  indicating there has been an error"
		);
	}
	return createdProject;
}

// Get static Data for createProject

async function getProjectsStaticData() {
	return await apiCaller.get(FETCH_CREATE_PROJECT_STATIC_DATA_URL);
}

async function getProjectBillabilityStatusForCreateNewProject() {
	// something like this :
	// return  await apiCaller.get(URL_CONSTANT_FOR_THIS_ENDPOINT)

	return ["Billable", "NonBillable"];
}

export {
	createProject,
	getProjectsStaticData,
	getProjectBillabilityStatusForCreateNewProject,
};
