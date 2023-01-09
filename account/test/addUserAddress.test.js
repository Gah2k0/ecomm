import { createUserUseCase } from "../src/use-case/createUserAccount.js";
import { addUserAddressUseCase } from "../src/use-case/addUserAddress.js";

createUserUseCase("Gabriel Francisco", "gabriel@email.com", "12345678");
createUserUseCase("Paula Francisco", "paula@email.com", "12345678");

console.log(addUserAddressUseCase("gabriel@email.com", "Rua Cascata", 87, "Casa", "Natal", "94015-380", "Gravataí", "RS"));


