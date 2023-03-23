const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    brokers: ['kafka:9092'],
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