// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from '@jest/globals';
import mockingoose from 'mockingoose';
import productValidation from '../../src/validations/productValidation';
import Category from '../../src/models/Category';

const validProduct = {
  name: 'Mesa gamer Madesa',
  description: 'Mesa top muito espaçosa',
  slug: 'mesa-gamer2',
  unitPrice: 250,
  stockQuantity: 9999,
  category: '63f9183b28b17b0d83f57693',
};

const invalidProduct = {
  name: '    ',
  description: ' ',
  slug: 'mesa-gamer2!!!!',
  unitPrice: -1,
  stockQuantity: 10000,
  category: 'a',
};

describe('Product validation test', () => {
  it('Should return an empty array', async () => {
    const validCategory = {
      name: 'Example',
      status: true,
    };

    mockingoose(Category).toReturn(validCategory, 'findOne');
    const result = await productValidation(validProduct);
    expect(result).toHaveLength(0);
  });

  it('Should return an array with errors', async () => {
    const result = await productValidation(invalidProduct);
    expect(result).toHaveLength(5);
    expect(result).toContain('Category Id is invalid');
    expect(result).toContain('Product name must start with a letter and must contain more than 3 characters.');
    expect(result).toContain('Product slug must contain only letters, numbers and hifens.');
    expect(result).toContain('Unit price must be higher than 0');
    expect(result).toContain('Stock quantity must be higher than 0 and lower than 10000');
  });
});
