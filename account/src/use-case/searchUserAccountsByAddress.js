import { userAccounts } from "./createUserAccount.js";

export function searchUserAccountsByAddressUseCase(address){
    const filteredSearchedUsers = userAccounts.filter(userAccount => userAccount.address?.uf === address);

    return filteredSearchedUsers;
}