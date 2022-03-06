import apiCaller from "../apiCaller";

import { SEARCH_PROJECT_URL, VIEW_PROJECT_LIST_URL, } from "../../Constants/apiConstants";

async function getAllProjects() {

    let allProjects = await apiCaller.get(VIEW_PROJECT_LIST_URL)
    return allProjects;
}

async function getAllProjectsPost(formData) {
	let projects = await apiCaller.post(VIEW_PROJECT_LIST_URL, formData.queryKey[1])
	if (projects.data.code !== 0) {
		throw new Error("The server returned a status 200 response but with code value !== 0  indicating there has been an error");
	}
	return projects
}


async function searchProjects(formData) {
	let projects = await apiCaller.post(SEARCH_PROJECT_URL, formData.queryKey[1])
	if (projects.data.code !== 0) {
		throw new Error("The server returned a status 200 response but with code value !== 0  indicating there has been an error");
	}
	return projects
}



export { getAllProjects, searchProjects, getAllProjectsPost }