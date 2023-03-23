const { Kafka } = require('kafkajs');

const KAFKA_HOST = process.env.KAFKA_HOST || 'localhost'
const KAFKA_PORT = process.env.KAFKA_PORT || '9092'

const kafka = new Kafka({
    brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
})

const consumer = kafka.consumer({ groupId: 'test-group' });

async function consumeMessage() {
    await consumer.connect();
    await consumer.subscribe({topic: 'invoice', fromBeginning: true})
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const invoice = JSON.parse(message.value);
            console.log(invoice);
        },
    });
};

module.exports = consumeMessage;