import { userAccounts } from "./createUserAccount.js";

export function searchUserAccountByEmailUseCase(email){
    const searchedUser = userAccounts.find(userAccount => userAccount.email === email);

    return searchedUser ? searchedUser.name : false;
}