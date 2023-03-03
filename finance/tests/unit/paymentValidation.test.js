// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it, expect } = require('@jest/globals');
const validatePayment = require('../../api/validations/paymentValidation.js');

const validMockedPayment = {
  nameOnCard: 'Gabriel Francisco',
  value: 100,
  cardNumber: '1234567812345678',
  expirationDate: '2025-04',
  cvv: '123',
};

const invalidMockedPayment = {
  nameOnCard: '     ',
  value: 0,
  cardNumber: '123456781234567',
  expirationDate: '2023-03',
  cvv: 'abc',
};

describe('Payment validation tests', () => {
  it('Should return an empty array', () => {
    const result = validatePayment(validMockedPayment);

    expect(result).toHaveLength(0);
  });
  it('Should return an array with error messages', () => {
    const result = validatePayment(invalidMockedPayment);

    expect(result).toHaveLength(5);
  });
});
