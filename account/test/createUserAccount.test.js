import { createUserUseCase } from "../src/use-case/createUserAccount.js";

const gabriel = {
    name: 'Gabriel Francisco',
    email: 'gabriel@email.com',
    password: 'senhaDoGabriel',
}
const paula = {
    name: 'Paula Francisco',
    email: 'paula@email.com',
    password: 'senhaDaPaula',
}
const robert = {
    name: 'Robert',
    email: 'robert@email.com',
    password: 'senhaDoRobert',
}

console.log(createUserUseCase(gabriel));
console.log(createUserUseCase(paula));
console.log(createUserUseCase(robert));


