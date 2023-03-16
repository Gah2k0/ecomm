import express from 'express'
import productsRoutes from './routes/productRoute.js';
import './authentication/bearerStrategy.js';

const app = express();

app.use(express.json());

app.use('/', productsRoutes);

export default app;
