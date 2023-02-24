import express from 'express';
import AccountController from '../controllers/accountController.js';

const router = express.Router();

router
  .get('/api/accounts', AccountController.getAllAccounts)
  .get('/api/accounts/:id', AccountController.getAccountById)
  .post('/api/admin/accounts', AccountController.createAccount)
  .put('/api/admin/accounts/:id', AccountController.updatedAccount)
  .delete('/api/admin/accounts/:id', AccountController.deleteAccount);

export default router;
