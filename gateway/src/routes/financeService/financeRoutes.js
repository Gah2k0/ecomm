import express from 'express';
import httpProxy from 'express-http-proxy';
import authBearerMiddleware from '../../authentication/bearerMiddleware.js';

const financeRoutes = express.Router();

const host = process.env.FINANCE_HOST || 'localhost';
const financeServiceUrl = `http://${host}:3004`;

financeRoutes
  .get('/payments/:id', authBearerMiddleware, httpProxy(financeServiceUrl, { timeout: 3000 }))
  .post('/payments', authBearerMiddleware, httpProxy(financeServiceUrl, { timeout: 3000 }))
  .post('/payments/:id/confirm', authBearerMiddleware, httpProxy(financeServiceUrl, { timeout: 3000 }))
  .patch('/payments/:id/cancel', authBearerMiddleware, httpProxy(financeServiceUrl, { timeout: 3000 }));

export default financeRoutes;
