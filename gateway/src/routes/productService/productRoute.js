import express from 'express';
import httpProxy from 'express-http-proxy';
import authBearerMiddleware from '../../authentication/bearerMiddleware.js';

const productRoutes = express.Router();

const host = process.env.PRODUCT_HOST || 'localhost';
const productServiceUrl = `http://${host}:3002`;

productRoutes
  .get('/api/products', httpProxy(productServiceUrl, { timeout: 3000 }))
  .get('/api/products/:id', httpProxy(productServiceUrl, { timeout: 3000 }))
  .post('/api/admin/products', authBearerMiddleware, httpProxy(productServiceUrl, { timeout: 3000 }))
  .put('/api/admin/products/:id', authBearerMiddleware, httpProxy(productServiceUrl, { timeout: 3000 }))
  .delete('/api/admin/products/:id', authBearerMiddleware, httpProxy(productServiceUrl, { timeout: 3000 }));

export default productRoutes;
