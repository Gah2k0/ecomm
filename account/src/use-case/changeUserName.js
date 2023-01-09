import { userAccounts } from "./createUserAccount.js";

export function changeUserNameUseCase(email, newName) {
    try{
        let userIndex = userAccounts.findIndex(user => user.email === email);

        if(userIndex == -1)
            return false;

        userAccounts[userIndex].name = newName;
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
};

