import localStrategy from 'passport-local';
import passport from 'passport';
import bcryptjs from 'bcryptjs';
import Account from '../models/Account.js';
import InvalidArgumentError from '../errors.js';

const LocalStrategy = localStrategy.Strategy;

function verifyPassword(loginPassword, accountPassword) {
  const validPassword = bcryptjs.compareSync(loginPassword, accountPassword);
  return validPassword;
}

async function searchForAccount(email) {
  const account = await Account.findOne({ email });
  return account;
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (email, password, done) => {
    try {
      const account = await searchForAccount(email);

      if (account && verifyPassword(password, account.password)) done(null, account);
      else throw new InvalidArgumentError('Incorrect email or password');
    } catch (error) {
      done(error);
    }
  }),
);
