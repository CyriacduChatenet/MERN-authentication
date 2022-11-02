import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DBconnection = () => {
    mongoose.connect(`${process.env.MONGODB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions,
    (err) => {
        if(!err) console.log('Connected to MongoDB !');
        else console.log(`Failed to connect to MongoDB : ${err}`);
    })
};

export default DBconnection;