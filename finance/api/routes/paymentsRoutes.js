const express = require ('express');
const PaymentsController = require('../controllers/PaymentsController.js');

const router = express.Router();

router
    .get("/payments/:id", PaymentsController.getPaymentById)
    .post("/payments", PaymentsController.createPayment)
    .post("/payments/:id/confirm", PaymentsController.confirmPayment)
    .patch("/payments/:id/cancel", PaymentsController.cancelPayment)
    
module.exports = router;