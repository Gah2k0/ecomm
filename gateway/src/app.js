import express from 'express'
import cors from 'cors';
import productRoutes from './routes/productService/productRoute.js';
import categoryRoutes from './routes/productService/categoryRoute.js';
import accountRoutes from './routes/accountService/accountRoutes.js';
import financeRoutes from './routes/financeService/financeRoutes.js';
import orderRoutes from './routes/orderService/orderRoutes.js';
import './authentication/bearerStrategy.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    exposedHeaders: 'authorization'
}));

app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', accountRoutes);
app.use('/', financeRoutes);
app.use('/', orderRoutes);

export default app;
