import request from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from '@jest/globals';
import app from '../../src/app';

describe('Category Controller', () => {
  let newCategoryId;
  it('Should be able to create a new category', async () => {
    const response = await request(app)
      .post('/api/admin/categories')
      .send({
        name: 'TESTE',
      });
    newCategoryId = response.body._id;
    expect(response.body.name).toEqual('TESTE');
  });

  it('Should be able get all the categories', async () => {
    const response = await request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.statusCode).toEqual(200);
  });

  it('Should be able get a specific category', async () => {
    const response = await request(app)
      .get(`/api/categories/${newCategoryId}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.statusCode).toEqual(200);
  });

  it('Should be able to update a specific category', async () => {
    const response = await request(app)
      .put(`/api/admin/categories/${newCategoryId}`)
      .send({
        name: 'Testando',
        status: false,
      });

    expect(response.status).toEqual(200);
  });

  it('Should not be able to update a specific category', async () => {
    const response = await request(app)
      .put(`/api/admin/categories/${newCategoryId}`)
      .send({
        name: '    ',
        status: false,
      });

    expect(response.status).toEqual(400);
  });

  it('Should be able to update a specific category status', async () => {
    const response = await request(app)
      .patch(`/api/admin/categories/${newCategoryId}`);

    expect(response.status).toEqual(200);
  });

  it('Should be able to delete a specific category', async () => {
    const response = await request(app)
      .delete(`/api/admin/categories/${newCategoryId}`)
      .expect(204);

    expect(response.status).toEqual(204);
  });
});
