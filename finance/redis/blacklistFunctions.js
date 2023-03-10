const util = require('util');
const crypto = require('crypto');
const blacklist = require('./blacklist.js');

const existsAsync = util.promisify(blacklist.exists).bind(blacklist);

const generateTokenHash = (token) => crypto.createHash('sha256').update(token).digest('hex');

const tokenExists = async (token) => {
  const tokenHash = generateTokenHash(token);
  const result = await existsAsync(tokenHash);
  return result === 1;
};

module.exports = tokenExists;
