const express = require ('express');
const PaymentsController = require('../controllers/PaymentsController.js');

const router = express.Router();

router
    .get("/payments/:id", PaymentsController.getPaymentById)
    .post("/payments", PaymentsController.createPayment)
    .patch("/payments/:id/:status", PaymentsController.updatedPaymentStatus)
    
module.exports = router;