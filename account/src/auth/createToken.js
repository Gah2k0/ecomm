import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createJwtToken = (account) => {
  const payload = {
    id: account._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  return token;
};

export default createJwtToken;
