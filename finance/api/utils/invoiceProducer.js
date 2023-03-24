const { Kafka } = require('kafkajs');

const KAFKA_HOST = process.env.KAFKA_HOST || 'localhost';
const KAFKA_PORT = process.env.KAFKA_PORT || '9092';

const kafka = new Kafka({
  brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
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
