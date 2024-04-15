import mongoose, { Schema } from "mongoose";

const Blogs = new Schema({
    title : {
        type : String,
        required : true,
    },
    banner : {
        type : String,
        default : ""
    },
    longdes : {
        type : String,
        required : true,
    },
    shortdes : {
        type : String,
        required : true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{timestamps : {createdAt : 'publishedAt'}})

export default mongoose.model("Blog",Blogs)