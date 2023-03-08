import passport from 'passport';

const authLocalMiddleware = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, account, info) => {
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

export default authLocalMiddleware;
