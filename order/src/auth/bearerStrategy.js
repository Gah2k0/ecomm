import bearerStrategy from 'passport-http-bearer';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import tokenExists from '../../redis/blacklistFunctions.js';

const BearerStrategy = bearerStrategy.Strategy;

async function verifyTokenOnBlacklist(token) {
  const isTokenOnBlacklist = await tokenExists(token);
  if (isTokenOnBlacklist) throw new jwt.JsonWebTokenError('Logout has been made with this token');
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verifyTokenOnBlacklist(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        done(null, payload.id);
      } catch (error) {
        done(error);
      }
    },
  ),
);
