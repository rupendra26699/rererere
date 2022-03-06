import axios from "axios";
import { BASE_URL, API_VERSION } from "../Constants/apiConstants";

const apiCaller = axios.create({
    baseURL: `${BASE_URL}/${API_VERSION}`,

    responseType: 'json'
})



export default apiCaller;