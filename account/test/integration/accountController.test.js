import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  it, expect, describe, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../src/app.js';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';

beforeAll(async () => {
  await mongoose.connect(`mongodb://admin:secret@${DB_HOST}:27017/ecomm-account-test?authSource=admin`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Account Controller', () => {
  let newAccountId;
  it('Should be able to create a new account', async () => {
    const response = await request(app)
      .post('/api/admin/accounts')
      .send({
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
      });
    newAccountId = response.body._id;
    expect(response.body.name).toEqual('Gabriel');
  });

  it('Should be able to get all accounts', async () => {
    const response = await request(app)
      .get('/api/accounts');
    expect(response.status).toEqual(200);
  });

  it('Should be able to get a specific accounts', async () => {
    const response = await request(app)
      .get(`/api/accounts/${newAccountId}`);
    expect(response.body.name).toEqual('Gabriel');
  });

  it('Should be able to update an account', async () => {
    const response = await request(app)
      .put(`/api/admin/accounts/${newAccountId}`)
      .send({
        name: 'Gabriel Francis ',
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
      });
    expect(response.status).toEqual(200);
  });

  it('Should be able to delete an account', async () => {
    const response = await request(app)
      .delete(`/api/admin/accounts/${newAccountId}`);
    expect(response.status).toEqual(204);
  });
});
