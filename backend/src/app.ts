import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import productRouter from './routes/products';
import orderRouter from './routes/orders';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const cors = require('cors');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_ADDRESS as string);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(3000, () => console.log('Listening on port 3000'));
