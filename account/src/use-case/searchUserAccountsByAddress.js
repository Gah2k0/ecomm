import { userAccounts } from "./createUserAccount.js";

export function searchUserAccountsByAddressUseCase(address){
    const searchedUsersWithAddresses = userAccounts.filter(userAccount => userAccount.hasOwnProperty("address"));

    const filteredSearchedUsers = searchedUsersWithAddresses.filter(userAccount => userAccount.address.uf === address);

    return filteredSearchedUsers;
}