import express from 'express';
import httpProxy from 'express-http-proxy';
import authBearerMiddleware from '../../authentication/bearerMiddleware.js';

const categoryRoutes = express.Router();

const host = process.env.PRODUCT_HOST || 'localhost';
const categoryServiceUrl = `http://${host}:3002`;

categoryRoutes
  .get('/api/categories', httpProxy(categoryServiceUrl, { timeout: 3000 }))
  .get('/api/categories/:id', httpProxy(categoryServiceUrl, { timeout: 3000 }))
  .post('/api/admin/categories', authBearerMiddleware, httpProxy(categoryServiceUrl, { timeout: 3000 }))
  .patch('/api/admin/categories/:id', authBearerMiddleware, httpProxy(categoryServiceUrl, { timeout: 3000 }))
  .put('/api/admin/categories/:id', authBearerMiddleware, httpProxy(categoryServiceUrl, { timeout: 3000 }))
  .delete('/api/admin/categories/:id', authBearerMiddleware, httpProxy(categoryServiceUrl, { timeout: 3000 }));

export default categoryRoutes;
