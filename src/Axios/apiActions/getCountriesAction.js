import { GET_COUNTRY_DATA_URL } from "../../Constants/apiConstants";
import apiCaller from "../apiCaller";

async function getAllCountry() {
  let allcountry = await apiCaller.get(GET_COUNTRY_DATA_URL);
  return allcountry;
}

export { getAllCountry };
