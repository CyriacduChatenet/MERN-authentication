import express from 'express';

import { getUsers } from '../controllers/user';
import { verifyToken } from '../middleware/auth/index';

const userRouter = express.Router();

userRouter.get('/', verifyToken, getUsers);

export default userRouter;