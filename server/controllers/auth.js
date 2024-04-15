import User from '../schema/user.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json("Fill all req fields")
    }
    let user;
    try {
        user = await User.findOne({ email: email })
        if (user) {
            return res.send({message : "Try with different email",status : "failed"})
        }
        else {
            try {
                const salt = await bcryptjs.genSalt(10);
                const hashedpass = await bcryptjs.hash(password, salt);

                const newUser = new User({name,email,password : hashedpass})
                await newUser.save();

                const userdetails = await User.findOne({email}).select('name email');
                console.log(userdetails)
                const payload = {
                    id: userdetails._id,
                  }
                  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
                  res.cookie('token', token, {
                    path: '/',
                    expires: new Date(Date.now() + 1000*60*60*24*7),
                    httpOnly: true,
                    sameSite: "lax"
                  })
                  return res.status(200).json({name : userdetails.name,email : userdetails.email,status : "sucess"})
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        return res.json({ error: error.message,status : "failed" })
    }
}

export const Login = async(req,res) => {
    let {email,password} = req.body;
    let existinguser;
    try {
        existinguser = await User.findOne({email}).select('password name email');
        if(existinguser){
        let isPassCorr = await bcryptjs.compare(password,existinguser.password)
        if(isPassCorr){
            const payload = {
                id: existinguser._id,
              }
              const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
              res.cookie('token', token, {
                path: '/',
                expires: new Date(Date.now() + 1000*60*60*24*7),
                httpOnly: true,
                sameSite: "lax"
              })
              return res.status(200).json({name : existinguser.name , email : existinguser.email , status : "sucess"})
        }
        else{
            return res.json({message : "Incorrect password",status : "failed"})
        }
      }else{
        return res.json({message : "User not found",status : "failed"})
      }
        
    } catch (error) {
        
        return res.status(401).json({message : "Something went wrong",status : "failed"});
    }
}

export const VerifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json("Token Missing");
    }
    else {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Token Invalid" })
        }
        else {
          req.user = decoded.id;
          next();
        }
      })
    }
  
  }
  
  export const isLogin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false)
    }
    else {
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.id) {
          return res.json(true);
        }
      } catch (error) {
        
        return res.json(false)
      }
    }
  }

  export const Logout = (req,res) => {
    try {
      res.clearCookie('token')
      return res.status(200).json("Logout sucessfull")
    } catch (error) {
      console.log(err.message);
      return res.json("something went wrong")
    }
  }