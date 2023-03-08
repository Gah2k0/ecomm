import bcryptjs from 'bcryptjs';

const hashPassword = (password) => bcryptjs.hashSync(password, 'salt');

export default hashPassword;
