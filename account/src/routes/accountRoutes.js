import express from 'express';
import AccountController from '../controllers/accountController.js';
import { authLocalMiddleware, authBearerMiddleware } from '../auth/authMiddleware.js';

const router = express.Router();

router
  .get('/api/accounts', authBearerMiddleware, AccountController.getAllAccounts)
  .get('/api/accounts/:id', AccountController.getAccountById)
  .get('/api/admin/accounts/logout', authBearerMiddleware, AccountController.logout)
  .post('/api/admin/accounts', AccountController.createAccount)
  .post('/api/accounts/login', authLocalMiddleware, AccountController.login)
  .put('/api/admin/accounts/:id', authBearerMiddleware, AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', authBearerMiddleware, AccountController.deleteAccount);

export default router;
