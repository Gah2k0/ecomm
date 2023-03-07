import request from 'supertest';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  describe, it, expect, beforeAll, afterAll,
} from '@jest/globals';
import dotenv from 'dotenv';
import app from '../../src/app';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';

beforeAll(async () => {
  await mongoose.connect(`mongodb://admin:secret@${DB_HOST}:27017/ecomm-test?authSource=admin`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Controller', () => {
  let newProductId;

  it('Should be able to create a new product', async () => {
    const createCategoryResponse = await request(app)
      .post('/api/admin/categories')
      .send({ name: 'TESTE' });
    const response = await request(app)
      .post('/api/admin/products')
      .send({
        name: 'Capa Celular Samsung',
        description: 'Capa de celular Samsung A22',
        slug: 'capa-celular-samsung',
        unitPrice: 19.99,
        stockQuantity: 100,
        category: createCategoryResponse.body._id,
      });
    newProductId = response.body._id;

    expect(response.statusCode).toEqual(201);
  });

  it('Should be able to get all products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.statusCode).toEqual(200);
  });

  it('Should be able to get a specific product', async () => {
    const response = await request(app)
      .get(`/api/products/${newProductId}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.statusCode).toEqual(200);
  });

  it('Should be able to update a specific product', async () => {
    const response = await request(app)
      .put(`/api/admin/products/${newProductId}`)
      .send({
        unitPrice: 30,
      });

    expect(response.status).toEqual(200);
  });

  it('Should be able to delete a specific product', async () => {
    const response = await request(app)
      .delete(`/api/admin/products/${newProductId}`)
      .expect(204);

    expect(response.status).toEqual(204);
  });
});
