import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({status: 200, data: users});
    } catch (err) {
        res.status(400).json({status: 400, error: err})
    }
};