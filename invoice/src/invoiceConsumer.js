const { Kafka } = require('kafkajs');
const createInvoice = require('./db/createInvoice.js');

const KAFKA_HOST = process.env.KAFKA_HOST || 'localhost';
const KAFKA_PORT = process.env.KAFKA_PORT || '9092';

const kafka = new Kafka({
  brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function consumeMessage() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'invoice', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageKey = JSON.parse(message.key);
      const messageValue = JSON.parse(message.value);
      const invoice = {
        payment_id: messageKey,
        description: messageValue,
      };
      console.log(invoice);
      await createInvoice(invoice);
    },
  });
}

module.exports = consumeMessage;
