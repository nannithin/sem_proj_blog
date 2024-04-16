import { useEffect, useState } from "react"
import axios from 'axios';
import CheckAuth from "../auth/checkauth";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav";

const Signup = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {auth} = CheckAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate("/")
        }
   
    },[auth])

    const submithandler = (e) => {
        e.preventDefault();
        axios.post('https://sem-proj-blog.vercel.app/api/auth/signup',{name,email,password},{withCredentials : true})
        .then(({ data }) => {
            if (data.status == 'sucess') {
                localStorage.setItem('user', JSON.stringify(data))
                navigate("/");
                setEmail('');
                setPassword('');

            }
            else {
                alert("login failed")
            }
        })
        setName('');
        setEmail('');
        setPassword('');
    }
    return(
        <>
        <Nav/>
        <div className="mx-auto min-w-[250px] max-w-[550px] mt-[5rem] shadow-panelShadow max-md:px-5">
           <form onSubmit={submithandler} className="flex flex-col gap-5 px-5 py-10" action="">
            <h1 className="text-primary font-semibold text-2xl ">SIGN UP</h1>
            <div>
                <p className="text-textColor mb-[3px]">Name</p>
                <input value={name} onChange={(e) => setName(e.target.value)} className="py-3 pl-[8px] pr-[2px] rounded-md" type="text" name="" id="" />
            </div>
            <div>
                <p className="text-textColor mb-[3px]">Email</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="py-3 pl-[8px] pr-[2px] rounded-md" type="email" name="" id="" />
            </div>
            <div>
                <p className="text-textColor mb-[3px]">Password</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="py-3 pl-[8px] pr-[2px] rounded-md" type="password" name="" id="" />
            </div>
            <button className="bg-primary w-full text-white rounded-md py-4 text-[17px] md:text-[19px] duration-200 hover:bg-primary/90">REGISTER</button>
           </form>
        </div>
        </>
    )
}

export default Signup;
