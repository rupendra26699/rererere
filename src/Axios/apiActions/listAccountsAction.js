import {
  GET_ACCOUNT_ID_URL,
  SEARCH_ACCOUNTS_URL,
  VIEW_ACCOUNT_LIST_URL,
} from "../../Constants/apiConstants";
import apiCaller from "../apiCaller";

async function getAllAccounts() {
  //TODO use get for calling the api
  let allAccounts = await apiCaller.get(VIEW_ACCOUNT_LIST_URL);
  return allAccounts;
}

async function getAccountId() {
  let accountId = await apiCaller.get(GET_ACCOUNT_ID_URL);
  return accountId;
}

async function searchAccounts(formData) {
	let accounts = await apiCaller.post(SEARCH_ACCOUNTS_URL, formData.queryKey[1])
	if (accounts.data.code !== 0) {
		throw new Error("The server returned a status 200 response but with code value !== 0  indicating there has been an error");
	}
	return accounts
}


export { getAllAccounts , getAccountId , searchAccounts };
