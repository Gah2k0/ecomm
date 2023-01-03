export const userAccounts = []

export function createUserUseCase(name, email, password){
    const createdUserAccount = {
        id: userAccounts.length + 1,
        name: name,
        email: email,
        password: password,
        createdDate: new Date().toLocaleDateString("pt-BR")
    };
    userAccounts.push(createdUserAccount);
    return createdUserAccount;
};