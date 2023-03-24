const database = require('../models/index.js');

const createInvoice = async (invoice) => {
  await database.Invoices.create(invoice);
};

module.exports = createInvoice;
