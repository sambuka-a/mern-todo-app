import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/errorMiddleware.js';
import { router } from './routes/todos.js';
import connectDB from './config/db.js'

const __filename = fileURLToPath(import.meta.url);

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/todos', router)

//Server frontend
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to prod'))
}

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT)
