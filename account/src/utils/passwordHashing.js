import bcryptjs from 'bcryptjs';

const salt = bcryptjs.genSaltSync(10);
const hashPassword = (password) => bcryptjs.hashSync(password, salt);

export default hashPassword;
