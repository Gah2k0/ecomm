import isNullOrEmpty from './stringIsNullOrEmpty.js';

function validateAddress(address) {
  const errors = [];
  const ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  const validCepRegex = new RegExp(/^\d{8}$/);

  if (!validCepRegex.test(address.cep)) { errors.push('Invalid CEP, CEP must contain exactly 8 digits'); }
  if (!ufs.includes(address.uf)) { errors.push('Invalid UF'); }
  return errors;
}

function validateAccount(account) {
  const errors = [];
  const validEmailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const validPasswordRegex = new RegExp(/(?=.*[a-z, A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/);
  const validCpfRegex = new RegExp(/^[0-9]{11}$/);
  const validPhoneRegex = new RegExp(/^[0-9]{10,13}$/);
  if (isNullOrEmpty(account.name)) { errors.push('Invalid name'); }
  if (!validEmailRegex.test(account.email)) { errors.push('Invalid email address'); }
  if (!validPasswordRegex.test(account.password)) { errors.push('The password must contain a letter, a number, a special character and must be at least 8 characters long.'); }
  if (!validCpfRegex.test(account.cpf)) { errors.push('Invalid CPF'); }
  if (!validPhoneRegex.test(account.phone)) { errors.push('Invalid phone number'); }
  errors.push(...validateAddress(account.address));
  return errors;
}

export default validateAccount;
