import express from 'express';
import passport from 'passport';
import AccountController from '../controllers/accountController.js';
import authLocalMiddleware from '../auth/authMiddleware.js';

const router = express.Router();

router
  .get('/api/accounts', passport.authenticate('bearer', { session: false }), AccountController.getAllAccounts)
  .get('/api/accounts/:id', AccountController.getAccountById)
  .post('/api/admin/accounts', AccountController.createAccount)
  .post('/api/accounts/login', authLocalMiddleware, AccountController.login)
  .put('/api/admin/accounts/:id', passport.authenticate('bearer', { session: false }), AccountController.updateAccount)
  .delete('/api/admin/accounts/:id', passport.authenticate('bearer', { session: false }), AccountController.deleteAccount);

export default router;
