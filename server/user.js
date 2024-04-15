import express from 'express';
import { Login, Logout, Signup, VerifyToken, isLogin } from './controllers/auth.js';
import { CreateBlog, getBlog, getBlogs, getUser, updateUser } from './controllers/blog.js';

const router = express.Router();

router.post("/login",Login)
router.post("/signup",Signup);
router.get("/islogin",isLogin);
router.post("/createblog",VerifyToken,CreateBlog);
router.get('/getblogs',getBlogs);
router.post('/getblog',getBlog);
router.post('/updateuser',VerifyToken,updateUser)
router.get('/logout',Logout)
router.get('/getuser',VerifyToken,getUser);

export default router;