import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { createHash } from 'crypto';
import blacklist from './blacklist.js';

const setAsync = promisify(blacklist.set).bind(blacklist);

const generateTokenHash = (token) => createHash('sha256').update(token).digest('hex');

const addToken = async (token) => {
  const expirationDate = jwt.decode(token).exp;
  const tokenHash = generateTokenHash(token);
  await setAsync(tokenHash, '');
  blacklist.expireat(tokenHash, expirationDate);
};

export default addToken;
