import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createJwtToken = (account) => {
  const payload = {
    id: account._id,
  };
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export default createJwtToken;
