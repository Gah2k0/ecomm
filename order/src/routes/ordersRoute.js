import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router
  .get('/api/orders/:id', OrderController.getOrderById)
  .post('/api/orders', OrderController.createOrder)
  .patch('/api/orders/:id/confirm/:paymentId', OrderController.confirmOrder);

export default router;
