const request = require('supertest');
// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it, expect } = require('@jest/globals');
const app = require('../../api/app');
const PAYMENT_STATUS = require('../../api/constants/constants');
const createPaymentMock = require('../mocks/createPaymentMock');
const confirmPaymentPayloadMock = require('../mocks/confirmPaymentPayloadMock');

describe('Payments Controller', () => {
  let newPaymentId;
  it('Should be able to create a new payment', async () => {
    const response = await request(app)
      .post('/payments')
      .send(createPaymentMock);
    newPaymentId = response.body.id;
    expect(response.body.status).toEqual(PAYMENT_STATUS.CRIADO);
  });

  it('Should be able get a specific payment', async () => {
    const response = await request(app)
      .get(`/payments/${newPaymentId}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.body.nameOnCard).toEqual('Gabriel Francisco');
  });

  it('Should be able to confirm a payment', async () => {
    const response = await request(app)
      .post(`/payments/${newPaymentId}/confirm`)
      .send(confirmPaymentPayloadMock)
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.body.status).toEqual(PAYMENT_STATUS.CONFIRMADO);
  });

  it('Should be able to cancel a payment', async () => {
    const newPayment = await request(app)
      .post('/payments')
      .send(createPaymentMock);
    const paymentId = newPayment.body.id;

    const response = await request(app)
      .patch(`/payments/${paymentId}/cancel`);

    expect(response.status).toEqual(204);
  });
});
