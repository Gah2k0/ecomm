import Account from '../models/Account.js';
import validateAccount from '../validations/accountValidation.js';
import hashPassword from '../utils/passwordHashing.js';
import createJwtToken from '../auth/createToken.js';
import addToken from '../../redis/blacklistFunctions.js';

class AccountController {
  static getAllAccounts = async (_req, res) => {
    try {
      const result = await Account.find();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static createAccount = async (req, res) => {
    const account = new Account(req.body);
    try {
      const accountValidationErrors = validateAccount(account);
      if (accountValidationErrors.length > 0) {
        return res.status(400).send({ message: accountValidationErrors });
      }

      account.password = hashPassword(account.password);
      const result = await account.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
      const account = await Account.findById(id);
      if (account) {
        return res.status(200).json(account);
      }
      return res.status(404).send({ message: 'User not found' });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static updateAccount = async (req, res) => {
    const { id } = req.params;
    const updatedAccount = req.body;
    try {
      const accountValidationErrors = validateAccount(updatedAccount);
      if (accountValidationErrors.length > 0) {
        return res.status(400).send({ message: accountValidationErrors });
      }

      await Account.findByIdAndUpdate(id, updatedAccount);
      return res.status(200).send('Account succesfully updated!');
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
      await Account.findByIdAndDelete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static login = (req, res) => {
    try {
      const token = createJwtToken(req.user);
      res.set('Authorization', token);
      res.status(204).send();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  static logout = async (req, res) => {
    const { authorization } = req.headers;
    let token;
    if (authorization.startsWith('Bearer ')) {
      token = authorization.substring(7, authorization.length);
    }
    await addToken(token);
    res.status(204).send();
  };
}

export default AccountController;
