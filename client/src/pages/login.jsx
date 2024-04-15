import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckAuth from "../auth/checkauth";
import Nav from "../components/nav";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { auth } = CheckAuth();
    let loadingToast;


    useEffect(() => {
        if (auth) {
            navigate("/")
        }

    }, [])


    const submithandler = (e) => {
        e.preventDefault();
        loadingToast = toast.loading("Loading")
        axios.post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true })
            .then(({ data }) => {
                toast.dismiss(loadingToast)
                if (data.status == 'sucess') {
                    localStorage.setItem('user', JSON.stringify(data));
                    const toastId = toast.success("Login successful");
                    setTimeout(() => {
                        toast.dismiss(toastId)
                        toast.dismiss(loadingToast)
                        navigate('/')
                    }, 1000);
                    setEmail('');
                    setPassword('');

                }
                else {
                    toast.dismiss(loadingToast)
                    toast.error(data.message)
                }
            })

    }

    return (
        <>
        <Nav/>
        <div className="mx-auto min-w-[250px] max-w-[550px] mt-[7rem] shadow-panelShadow max-md:px-5">
            <Toaster/>
            <form onSubmit={submithandler} className="flex flex-col gap-5 px-5 py-10" action="">
                <h1 className="text-primary font-semibold text-2xl ">LOG IN</h1>
                <div>
                    <p className="text-textColor mb-[3px]">Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="py-3 pl-[8px] pr-[2px] rounded-md" type="email" name="" id="" />
                </div>
                <div>
                    <p className="text-textColor mb-[3px]">Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="py-3 pl-[8px] pr-[2px] rounded-md" type="password" name="" id="" />
                </div>
                <button type="submit" className="bg-primary w-full text-white rounded-md py-4 text-[17px] md:text-[19px] duration-200 hover:bg-primary/90">LOG IN</button>
            </form>
        </div>
        </>
    )
}

export default Login;