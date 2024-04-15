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
    origin : [`${process.env.REACT_URL}`,],
    methods : ['POST','GET','PUT'],
    credentials : true,
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
