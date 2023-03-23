import dotenv from 'dotenv';
import app from './src/app.js';
import './src/redis/blacklist.js';

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.json({ message: 'Runnig application' }));

app.listen(port, () => console.log('Application running'));
