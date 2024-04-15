import Blogs from "../schema/blog.js";
import User from "../schema/user.js";

export const CreateBlog = async(req,res) => {
    let {title,shortdes,longdes,banner} = req.body;
    let id = req.user;
    try {
        const newblog = new Blogs({title,shortdes,longdes,author : id,banner});
        await newblog.save();
        return res.status(200).json("published")
    } catch (error) {
        console.log(error);
        return res.status(400).json("something went wrong")
    }
}

export const getBlogs = async(req,res) => {
    let blogs;
    try {
        await Blogs.find({})
        .populate('author','name email -_id')
        .then((blog) => {
            return res.json(blog)
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error);
        return res.json("something went wrong")
    }
}

export const getBlog = async(req,res) => {
    let {id} = req.body;
    try {
        const blog = await Blogs.findById(id).populate('author','name email -_id')
        if(blog){
            return res.json(blog)
        }
    } catch (error) {
        console.log(error);
        return res.json("something went wrong")
    }
}

export const getUser = async(req,res) => {
    const id = req.user;
    let user;
    try {
        user = await User.findById(id).select('-password').populate('blogs');
        if(user){
            return res.json({user});
        }else{
            return res.json("user not found")
        }
    } catch (error) {
        console.log(error.message);
        return res.json("something went wrong")
    }
}

export const updateUser = async(req,res) => {
    let id = req.user;
    let {name , email} = req.body;
    try {
        await User.findOneAndUpdate({_id :id},{name,email});
        return res.json("updated")
    } catch (error) {
        console.log(error)
    }
}