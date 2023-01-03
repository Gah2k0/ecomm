import { createUserUseCase } from "../src/use-case/createUserAccount.js";
import { searchUserAccountByEmailUseCase } from "../src/use-case/searchUserAccountByEmail.js";

createUserUseCase("Gabriel Francisco", "gabriel@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula@email.com", "12345678");

console.log(searchUserAccountByEmailUseCase("gabriel@email.com"));
console.log(searchUserAccountByEmailUseCase("paula@email.com"));
console.log(searchUserAccountByEmailUseCase("jose@email.com"));