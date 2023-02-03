import mongoose from 'mongoose';

const dbConfig = { 
    url: 'mongodb://localhost:27017/Ecomm',
    user: 'admin',
    pwd: 'secret'
};

mongoose.connect('mongodb://admin:secret@localhost:27017/ecomm?authSource=admin')

let db = mongoose.connection;

export default db;