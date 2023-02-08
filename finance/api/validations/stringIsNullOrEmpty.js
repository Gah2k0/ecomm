const isNullOrEmpty = (str) => str === null || str.match(/^ *$/) !== null;
module.exports = isNullOrEmpty;