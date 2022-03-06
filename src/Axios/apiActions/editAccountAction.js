import { EDIT_ACCOUNT_URL } from "../../Constants/apiConstants";
import apiCaller from "../apiCaller";

async function editAccount(data) {
  let account = await apiCaller.post(EDIT_ACCOUNT_URL, data);
  return account;
}

export {editAccount}