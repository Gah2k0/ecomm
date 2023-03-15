const BearerStrategy = require('passport-http-bearer').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const tokenExists = require('../../redis/blacklistFunctions.js');

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
