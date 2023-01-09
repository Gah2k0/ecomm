import { userAccounts } from "./createUserAccount.js";

export function addUserAddressUseCase(email, logradouro, numero, complemento, bairro, cep, cidade, uf) {
    try{
        const userAddress = {
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            uf: uf
        };
        let userIndex = userAccounts.findIndex(user => user.email === email);

        if(userIndex == -1)
            return false;

        userAccounts[userIndex].address = userAddress;
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
}


// logradouro
// número
// complemento
// bairro
// cep
// cidade
// uf