import jwt from 'jsonwebtoken';

const createJwtToken = (account) => {
  const payload = {
    id: account._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  return token;
};

export default createJwtToken;
