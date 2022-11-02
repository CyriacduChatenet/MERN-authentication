import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import DBconnection from './config/dbConfig';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import { verifyToken } from './middleware/auth/index';

const app = express();

app.use(express.json());
dotenv.config();
DBconnection();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('*', verifyToken);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});