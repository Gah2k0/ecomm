import express from 'express';
import httpProxy from 'express-http-proxy';
import authBearerMiddleware from '../../authentication/bearerMiddleware.js';

const host = process.env.ORDER_HOST || 'localhost';
const orderServiceUrl = `http://${host}:3003`;

const orderRoutes = express.Router();

orderRoutes
  .get('/api/orders/:id', authBearerMiddleware, httpProxy(orderServiceUrl))
  .post('/api/orders', authBearerMiddleware, httpProxy(orderServiceUrl))
  .patch('/api/orders/:id/confirm/:paymentId', authBearerMiddleware, httpProxy(orderServiceUrl));

export default orderRoutes;
