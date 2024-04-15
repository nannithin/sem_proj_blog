import { Schema } from "mongoose";
import mongoose from 'mongoose';

const User = Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    blogs : {
        type : [Schema.Types.ObjectId],
        ref : 'Blog',
        default : [],
    }
},{timestamps : {
    createdAt : 'joinedAt'
}});

export default mongoose.model('User',User)