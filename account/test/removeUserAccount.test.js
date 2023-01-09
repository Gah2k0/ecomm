import { createUserUseCase } from "../src/use-case/createUserAccount.js";
import { removeUserUseCase } from "../src/use-case/removeUserAccount.js";

createUserUseCase("Gabriel Francisco", "gabriel@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula2@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula3@email.com", "12345678");

console.log(removeUserUseCase("gabriel@email.com"));

