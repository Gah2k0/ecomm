import express from 'express';
import OrderController from '../controllers/orderController.js';
import authBearerMiddleware from '../auth/bearerMiddleware.js';

const router = express.Router();

router
  .get('/api/orders/:id', authBearerMiddleware, OrderController.getOrderById)
  .post('/api/orders', authBearerMiddleware, OrderController.createOrder)
  .patch('/api/orders/:id/confirm/:paymentId', authBearerMiddleware, OrderController.confirmOrder);

export default router;
