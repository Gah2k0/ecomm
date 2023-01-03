import { userAccounts } from "./createUserAccount.js";
import { searchUserAccountByEmailUseCase } from "./searchUserAccountByEmail.js";

export function removeUserUseCase(email) {
    let userIndex = userAccounts.findIndex(user => user.email === email);
    userAccounts.splice(userIndex, 1);

    const searchedUser = searchUserAccountByEmailUseCase("gabriel@email.com");

    return searchedUser ? false : true;
}