import Account from '../models/Account.js';
import validateAccount from '../validations/accountValidation.js';

class AccountController {
  static getAllAccounts = (_req, res) => {
    Account.find((errors, accounts) => {
      if (!errors) { res.status(200).json(accounts); }
    });
  };

  static createAccount = (req, res) => {
    const account = new Account(req.body);
    try {
      const accountValidationErrors = validateAccount(account);
      if (accountValidationErrors.length > 0) { return res.status(400).send({ message: accountValidationErrors }); }
      return account.save(() => res.status(201).json(account));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static getAccountById = (req, res) => {
    const { id } = req.params;
    try {
      return Account.findById(id, (errors, account) => {
        if (account) { return res.status(200).json(account); }
        return res.status(404).send({ message: 'User not found' });
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  static updateAccount = (req, res) => {
    const { id } = req.params;
    const updatedAccount = req.body;
    try {
      const accountValidationErrors = validateAccount(updatedAccount);
      if (accountValidationErrors.length > 0) { return res.status(400).send({ message: accountValidationErrors }); }

      return Account.findByIdAndUpdate(id, updatedAccount, () => res.status(200).send('Account succesfully updated!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteAccount = (req, res) => {
    const { id } = req.params;
    try {
      return Account.findByIdAndDelete(id, () => res.status(200).send('Account succesfully deleted!'));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };
}

export default AccountController;
