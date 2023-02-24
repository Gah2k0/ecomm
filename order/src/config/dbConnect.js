import mongoose from 'mongoose';

const dbConfig = {
  url: 'mongodb://admin:secret@mongodb:27017/Ecomm-order?authSource=admin',
};

const areWeTesting = process.env.JEST_WORKER_ID !== undefined;

if (areWeTesting) dbConfig.url = 'mongodb://admin:secret@localhost:27017/Ecomm-order?authSource=admin';

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

export default db;
