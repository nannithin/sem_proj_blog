import express from 'express';
import mongoose from 'mongoose';
import allRoutes from './main.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors({
    origin:["https://blogger-roan.vercel.app"],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser());


app.use('/api',allRoutes)

const mongooseConnection = () => {
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(()=>{
        console.log("database conected")
    })
    .catch(err=>{
        console.log(err.message);
    })
}

app.listen(process.env.PORT,() => {
    mongooseConnection();
    console.log(`server running ${process.env.PORT}`)
})
