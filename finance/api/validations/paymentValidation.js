const isNullOrEmpty = require('./stringIsNullOrEmpty.js');

function validatePayment(payment){
    const cardNumberRegex = new RegExp(/^\d{16}$/);
    const expirationDateRegex = new RegExp(/^\d{4}-\d{2}$/);
    const cvvRegex = new RegExp(/^\d{3}$/);
    const errors = [];
    if(isNullOrEmpty(payment.nameOnCard))
        errors.push('The provided name is invalid');
    if(payment.value <= 0)
        errors.push('The payment value should be higher than 0');
    if(!cardNumberRegex.test(payment.cardNumber))
        errors.push('The provided card number is invalid');
    if(!expirationDateRegex.test(payment.expirationDate) || !validateDate(payment.expirationDate))
        errors.push('The provided expiration date is invalid');
    if(!cvvRegex.test(payment.cvv))
        errors.push('The provided CVV is invalid')
    return errors;
}

function validateDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    if(Number(month) > 12 || Number(month) < 1)
        return false;
    const formattedDate = new Date(`${month}/1/${year}`);
    const actualDate = new Date();
    if(formattedDate.getYear() < actualDate.getYear() || (formattedDate.getMonth() <= actualDate.getMonth() && formattedDate.getYear() == actualDate.getYear()))
        return false;
    return true;
}

module.exports = validatePayment;