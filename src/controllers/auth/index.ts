import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../../models/user';

dotenv.config();

interface IJWT {
    email: string;
    password: string;
}

export const generateAccessToken = ({email, password} : IJWT) => {
    return jwt.sign({email, password}, `${process.env.JWT_KEY}`, {expiresIn: '10min'});
}

export const generateRefreshAccessToken = ({email, password} : IJWT) => {
    return jwt.sign({email, password}, `${process.env.REFRESH_JWT_KEY}`, {expiresIn: '1d'});
}

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            username, email, password: hashPassword});
        res.status(200).json({status: 200, data: req.body});
    } catch (err) {
        res.status(400).json({status: 400, error : 'Username, Email and Password fields are required !'});
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const findUserInDB = await User.find({ email: req.body.email});
        const matchPassword = await bcrypt.compare(req.body.password, findUserInDB[0].password);

        if(!matchPassword) {
            res.status(400).json({status: 403, errors : {email: '', password: 'Wrong password'}});
        }

        const accessToken = generateAccessToken({email, password});

        res.cookie('token', accessToken);
        res.cookie('user_id', findUserInDB[0]._id);

        res.status(200).json({status: 200, user_id: findUserInDB[0]._id, info: 'you are Logged in', token: accessToken});
        
    } catch (err) {
        res.status(400).json({status: 400, errors : {email: 'Email not found', password: ''}});
    }
};

export const refreshToken = (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, `${process.env.REFRESH_JWT_KEY}`, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(401);
      }
      const refreshedToken = generateRefreshAccessToken(user);
      res.send({
        accessToken: refreshedToken,
      });
    });
  };