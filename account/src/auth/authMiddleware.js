import passport from 'passport';

const authLocalMiddleware = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, account) => {
      if (error && error.name === 'InvalidArgumentError') {
        return res.status(400).json({ error: error.message });
      }

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!account) {
        return res.status(401).json();
      }

      req.user = account;
      return next();
    },
  )(req, res, next);
};

const authBearerMiddleware = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    (error, account) => {
      if (error && error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: error.message });
      }

      if (error && error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: error.message, expiredAt: error.expiredAt });
      }

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!account) {
        return res.status(401).json();
      }

      req.user = account;
      return next();
    },
  )(req, res, next);
};

export { authLocalMiddleware, authBearerMiddleware };
