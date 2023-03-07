const confirmPaymentPayloadMock = {
  customerName: 'Gabriel Francisco',
  customerCpf: '12345678912',
  customerAddress: 'Rua Cascata,87,Casa,94015380,Gravataí,RS',
  items: [
    {
      name: 'Teste',
      quantity: 2,
      unitPrice: 100,
      discount: 5,
    },
  ],
};

module.exports = confirmPaymentPayloadMock;
