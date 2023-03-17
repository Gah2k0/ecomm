import express from 'express';
import AccountController from '../controllers/accountController.js';
import authLocalMiddleware from '../auth/authMiddleware.js';

const router = express.Router();

router
  .get('/api/accounts', AccountController.getAllAccounts)
  .get('/api/accounts/:id', AccountController.getAccountById)
  .get('/api/admin/accounts/logout', AccountController.logout)
  .post('/api/admin/accounts', AccountController.createAccount)
  .post('/api/accounts/login', authLocalMiddleware, AccountController.login)
  .put('/api/admin/accounts/:id', AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', AccountController.deleteAccount);

export default router;
