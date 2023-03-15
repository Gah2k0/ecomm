const express = require('express');
const PaymentsController = require('../controllers/PaymentsController.js');
const authBearerMiddleware = require('../auth/bearerMiddleware.js');

const router = express.Router();

router
  .get('/payments/:id', authBearerMiddleware, PaymentsController.getPaymentById)
  .post('/payments', authBearerMiddleware, PaymentsController.createPayment)
  .post('/payments/:id/confirm', authBearerMiddleware, PaymentsController.confirmPayment)
  .patch('/payments/:id/cancel', authBearerMiddleware, PaymentsController.cancelPayment);

module.exports = router;
