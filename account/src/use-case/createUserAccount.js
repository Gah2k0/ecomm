const userAccounts = []

function createUserUseCase(user){
    const createdUserAccount = {
        id: userAccounts.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
        createdDate: Date()
    };
    userAccounts.push(createdUserAccount);
    return createdUserAccount;
}

export { createUserUseCase };