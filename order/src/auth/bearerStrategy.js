import bearerStrategy from 'passport-http-bearer';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const BearerStrategy = bearerStrategy.Strategy;

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
