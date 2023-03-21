import express from 'express';
import app from './src/app.js';
import dotenv from 'dotenv';
import blacklist from './src/redis/blacklist.js';

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.json({ message: 'Runnig application' });
});

app.listen(port, () => console.log('Application running'));