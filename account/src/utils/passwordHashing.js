import bcryptjs from 'bcryptjs';

const hashPassword = (password) => bcryptjs.hashSync(password);

export default hashPassword;
