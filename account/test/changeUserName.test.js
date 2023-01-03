import { createUserUseCase } from "../src/use-case/createUserAccount.js";
import { changeUserNameUseCase } from "../src/use-case/changeUserName.js";

createUserUseCase("Gabriel Francisco", "gabriel@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula2@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula3@email.com", "12345678");

console.log(changeUserNameUseCase("gabriel@email.com", "TESTANDO FRANCISCO"));
console.log(changeUserNameUseCase("gabriel@eaiasdasadadadl.com", "TESTANDO HEHE"));
