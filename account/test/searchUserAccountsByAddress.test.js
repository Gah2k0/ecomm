import { createUserUseCase, userAccounts } from "../src/use-case/createUserAccount.js";
import { searchUserAccountsByAddressUseCase } from "../src/use-case/searchUserAccountsByAddress.js";
import { addUserAddressUseCase } from "../src/use-case/addUserAddress.js";

createUserUseCase("Gabriel Francisco", "gabriel@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula@email.com", "12345678");
createUserUseCase("Jose Francisco", "jose@email.com", "12345678");
createUserUseCase("Gandalf o Cinzento", "gandalf@email.com", "12345678");
createUserUseCase("Frodo Bolseiro", "bolsao@email.com", "12345678");

addUserAddressUseCase("gabriel@email.com", "Rua Cascata", 87, "Casa", "Natal", "94015-380", "Gravataí", "RS");
addUserAddressUseCase("paula@email.com", "Rua Cascata", 87, "Casa", "Natal", "94015-380", "Gravataí", "RS");
addUserAddressUseCase("jose@email.com", "Rua Bonita", 101, "Casa", "Qualquer Bairro", "94015-380", "Campinas", "SP");
addUserAddressUseCase("gandalf@email.com", "Rua Lindinha", 101, "Casa", "Qualquer Bairro", "94015-380", "São Paulo", "SP");
addUserAddressUseCase("bolsao@email.com", "Bolsão", 101, "Casa", "Vila dos Hobbits", "94015-380", "Condado", "SP");

console.log(searchUserAccountsByAddressUseCase("MG"));
