import { userAccounts } from "./createUserAccount.js";

export function searchUserAccountsByAddressUseCase(address){
    const searchedUsers = userAccounts.filter(userAccount => userAccount.address.uf === address);

    return searchedUsers;
}