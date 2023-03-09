import localStrategy from 'passport-local';
import bearerStrategy from 'passport-http-bearer';
import passport from 'passport';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Account from '../models/Account.js';
import InvalidArgumentError from '../errors.js';
import { tokenExists } from '../../redis/blacklistFunctions.js';

dotenv.config();

const LocalStrategy = localStrategy.Strategy;
const BearerStrategy = bearerStrategy.Strategy;

function verifyPassword(loginPassword, accountPassword) {
  const validPassword = bcryptjs.compareSync(loginPassword, accountPassword);
  return validPassword;
}

async function searchForAccount(email) {
  const account = await Account.findOne({ email });
  return account;
}

async function verifyTokenOnBlacklist(token) {
  const isTokenOnBlacklist = await tokenExists(token);
  if (isTokenOnBlacklist) throw new jwt.JsonWebTokenError('Logout has been made with this token');
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

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verifyTokenOnBlacklist(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const account = await Account.findById(payload.id);
        done(null, account, { token });
      } catch (error) {
        done(error);
      }
    },
  ),
);
