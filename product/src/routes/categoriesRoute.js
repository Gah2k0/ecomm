import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import authBearerMiddleware from '../auth/bearerMiddleware.js';

const router = express.Router();

router
  .get('/api/categories', CategoryController.getAllCategories)
  .get('/api/categories/:id', CategoryController.getCategoryById)
  .post('/api/admin/categories', authBearerMiddleware, CategoryController.createCategory)
  .patch('/api/admin/categories/:id', authBearerMiddleware, CategoryController.activateCategory)
  .put('/api/admin/categories/:id', authBearerMiddleware, CategoryController.updateCategory)
  .delete('/api/admin/categories/:id', authBearerMiddleware, CategoryController.deleteCategory);

export default router;
