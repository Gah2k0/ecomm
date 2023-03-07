// eslint-disable-next-line import/no-extraneous-dependencies
import {
  it, expect, describe,
} from '@jest/globals';
import validateAccount from '../../src/validations/accountValidation';

const validMockedAccount = {
  name: 'Gabriel',
  email: 'gabriel@email.com',
  password: 'g4briel!',
  cpf: '12345678912',
  phone: '51983284627',
  address: {
    street: 'Rua Cícero Hermínio',
    number: '100',
    complement: 'Casa',
    district: 'Cristo Redentor',
    cep: '94015380',
    city: 'Qualquer Uma',
    uf: 'RS',
  },
};

const invalidMockedAccount = {
  name: '    ',
  email: 'gabrielemail.com',
  password: '123!',
  cpf: 'asdad',
  phone: 'vvvc',
  address: {
    street: 'Rua Cícero Hermínio',
    number: '100',
    complement: 'Casa',
    district: 'Cristo Redentor',
    cep: 'asdasda',
    city: 'Qualquer Uma',
    uf: 'ABA',
  },
};

describe('Account validation tests', () => {
  it('Should return an empty array', () => {
    const result = validateAccount(validMockedAccount);

    expect(result).toHaveLength(0);
  });
  it('Should return an array with error messages', () => {
    const result = validateAccount(invalidMockedAccount);

    expect(result).toHaveLength(7);
  });
});
