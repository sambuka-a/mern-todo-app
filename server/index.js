import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/errorMiddleware.js';
import { router } from './routes/todos.js';
import connectDB from './config/db.js'

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/todos', router)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT)