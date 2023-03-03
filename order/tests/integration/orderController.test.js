// eslint-disable-next-line import/no-extraneous-dependencies
import {
  it, expect, describe, jest, beforeAll, afterAll,
} from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../src/app';
import orderMock from '../mocks/orderMock';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';

beforeAll(async () => {
  await mongoose.connect(`mongodb://admin:secret@${DB_HOST}:27017/ecomm-order-test?authSource=admin`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order controller', () => {
  let newOrderId;
  it('Should be able to create a new order', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ name: 'Gabriel', cpf: '12345678912', address: 'Rua bonita' }),
    }));

    const response = await request(app)
      .post('/api/orders')
      .send(orderMock)
      .set('Accept', 'application/json')
      .expect('content-type', /json/);
    // eslint-disable-next-line no-underscore-dangle
    newOrderId = response.body._id;
    global.fetch.mockClear();
    expect(response.status).toEqual(201);
  });

  it('Should be able to get a specific order', async () => {
    const response = await request(app)
      .get(`/api/orders/${newOrderId}`);

    expect(response.status).toEqual(200);
  });

  it('Should be able to confirm an order', async () => {
    const paymentId = 30;
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        nameOnCard: 'John Doe',
        status: 'CONFIRMADO',
        value: 30,
        cardNumber: '1234567812345678',
        expirationDate: '2030-01',
        createdAt: '2023-02-10 16:34:07',
        updatedAt: '2023-02-10 16:34:07',
        name: 'Gabriel',
        cpf: '12345678912',
        address: 'Rua bonita',
      }),
    }));
    const response = await request(app)
      .patch(`/api/orders/${newOrderId}/confirm/${paymentId}`);

    expect(response.status).toEqual(200);
    expect(response.body.nameOnCard).toEqual('John Doe');
  });
});
