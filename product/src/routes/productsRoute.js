import express from 'express';
import ProductController from '../controllers/productController.js';
import authBearerMiddleware from '../auth/bearerMiddleware.js';

const router = express.Router();

router
  .get('/api/products', ProductController.getAllProducts)
  .get('/api/products/:id', ProductController.getProductById)
  .post('/api/admin/products', authBearerMiddleware, ProductController.createProduct)
  .put('/api/admin/products/:id', authBearerMiddleware, ProductController.updateProduct)
  .delete('/api/admin/products/:id', authBearerMiddleware, ProductController.deleteProduct);

export default router;
