import express from 'express';
import { login, refreshToken, register } from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refreshToken', refreshToken);

export default authRouter;