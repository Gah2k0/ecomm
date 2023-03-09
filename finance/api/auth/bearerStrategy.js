const BearerStrategy = require('passport-http-bearer').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // const account = await Account.findById(payload.id);
        done(null, payload.id);
      } catch (error) {
        done(error);
      }
    },
  ),
);
