import accounts from '../models/Account.js';
import validateAccount from '../validations/accountValidation.js';

class AccountController {
    static getAllAccounts = (req, res) => {
        accounts.find((errors, accounts) => {
            if(!errors)
                res.status(200).json(accounts);
        })
    }
    static createAccount = (req, res) => {
        const account = new accounts(req.body);
        const accountValidationErrors = validateAccount(account);
        if(accountValidationErrors.length > 0){
            res.status(400).send({message: accountValidationErrors});
        }
        else{
            account.save((error) => {
                if(error){
                    res.status(500).send({message: `${error.message}`})
                } else {
                    res.status(201).send(account.toJSON())
                };
            });
        };
    }
    static getAccountById = (req, res) => {
        const { id } = req.params;

        accounts.findById(id, (errors, account) => {
            if(!errors && account)
                res.status(200).json(account);
            else if(!account)
                res.status(404).send({message: 'User not found'})
            else {
                res.status(500).send({message: errors.message});
            }
        })
    }
    static updatedAccount = (req, res) => {
        const { id } = req.params;
        const updatedAccount = req.body;
        const accountValidationErrors = validateAccount(updatedAccount);
        if(accountValidationErrors.length > 0){
            res.status(400).send({message: accountValidationErrors});
        }
        else{
            accounts.findByIdAndUpdate(id, updatedAccount, (error) => {
                if(error){
                    res.status(500).send({message: `${error.message}`})
                } else {
                    res.status(200).send("Account succesfully updated!")
                };
            });
        };
    }
    static deleteAccount = (req, res) => {
        let { id } = req.params;

        accounts.findByIdAndDelete(id, (error) => {
            if(!error){
                res.status(200).send("Account succesfully deleted!");
            } else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
}

export default AccountController;