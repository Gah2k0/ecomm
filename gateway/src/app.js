import express from 'express'
import productRoutes from './routes/productService/productRoute.js';
import categoryRoutes from './routes/productService/categoryRoute.js';
import accountRoutes from './routes/accountService/accountRoutes.js';
import financeRoutes from './routes/financeService/financeRoutes.js';
import './authentication/bearerStrategy.js';

const app = express();

app.use(express.json());

app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', accountRoutes);
app.use('/', financeRoutes);

export default app;
