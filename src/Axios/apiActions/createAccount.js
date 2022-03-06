import apiCaller from "../apiCaller";
import { CREATE_ACCOUNT_URL } from "../../Constants/apiConstants";

async function createAccount(formData) {
  let account = await apiCaller.post(CREATE_ACCOUNT_URL, formData);
  return account;
}

export { createAccount };
