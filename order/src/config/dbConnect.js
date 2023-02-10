import mongoose from 'mongoose';

const dbConfig = { 
    url: 'mongodb://mongodb:27017/Ecomm-order',
    user: 'admin',
    pwd: 'secret'
};

mongoose.connect('mongodb://admin:secret@mongodb:27017/Ecomm-order?authSource=admin')

let db = mongoose.connection;

export default db;