import util from 'util';
import crypto from 'crypto';
import blacklist from './blacklist.js';

const existsAsync = util.promisify(blacklist.exists).bind(blacklist);

const generateTokenHash = (token) => crypto.createHash('sha256').update(token).digest('hex');

const tokenExists = async (token) => {
  const tokenHash = generateTokenHash(token);
  const result = await existsAsync(tokenHash);
  return result === 1;
};

export default tokenExists;
