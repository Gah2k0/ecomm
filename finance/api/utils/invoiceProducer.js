const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const sendInvoiceMessage = async (paymentId, invoiceItems) => {
  const message = {
    key: paymentId,
    value: JSON.stringify(invoiceItems),
  };
  await producer.connect();
  await producer.send({
    topic: 'invoice',
    messages: [
      message,
    ],
  });

  await producer.disconnect();
};

module.exports = sendInvoiceMessage;
