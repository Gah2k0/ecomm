import express from 'express';
import httpProxy from 'express-http-proxy';
import authBearerMiddleware from '../../authentication/bearerMiddleware.js';

const host = process.env.ACCOUNT_HOST || 'localhost';
const accountServiceUrl = `http://${host}:3001`;

const accountRoutes = express.Router();

accountRoutes
  .get('/api/accounts', authBearerMiddleware, httpProxy(accountServiceUrl))
  .get('/api/accounts/:id', httpProxy(accountServiceUrl))
  .get('/api/admin/accounts/logout', authBearerMiddleware, httpProxy(accountServiceUrl))
  .post('/api/admin/accounts', httpProxy(accountServiceUrl))
  .post('/api/accounts/login', httpProxy(accountServiceUrl))
  .put('/api/admin/accounts/:id', authBearerMiddleware, httpProxy(accountServiceUrl))
  .delete('/api/admin/accounts/:id', authBearerMiddleware, httpProxy(accountServiceUrl));

export default accountRoutes;

