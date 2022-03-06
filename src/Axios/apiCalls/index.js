

import { CHECK_IF_EMPLOYEE_ID_IS_AVAILABLE, CHECK_IF_EMPLOYEE_EMAIL_IS_AVAILABLE } from "../../Constants/apiConstants";
import apiCaller from "../apiCaller";


export async function isEmployeeEmailAvailable(emailId) {

    let url = `${CHECK_IF_EMPLOYEE_EMAIL_IS_AVAILABLE}${emailId}`

    try {
        let returnValue = await apiCaller.get(url)

        if (returnValue.data.code === 0 && returnValue.data.status === "SUCCESS" && returnValue.data.data === false) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false;
    }


}



export async function isEmployeeIdAvailable(id) {
    try {
        let returnValue = await apiCaller.get(`${CHECK_IF_EMPLOYEE_ID_IS_AVAILABLE}${id}`);
        if (returnValue.data.code === 0 && returnValue.data.status === "SUCCESS" && returnValue.data.data === false) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}