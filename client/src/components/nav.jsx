import { useState } from "react";
import { Link } from "react-router-dom";
import img from '../assets/pexels-asad-photo-maldives-3293148.jpg'
import NavOpen from "./nav-open";
import CheckAuth from "../auth/checkauth";

const Nav = () => {
    const {auth} = CheckAuth()
    const [open,setOpen] = useState(false)
    return(
        <div className="bg-primary h-[80px] min-w-full flex justify-between items-center md:px-[50px] px-5 sticky top-0">
            <Link to={"/"} className="font-semibold text-[19px] md:text-[21px] text-white">Blogger</Link>
            <ul className="flex items-center gap-[3rem] text-[16px] md:text-[19px] text-white">
                {
                    !auth ? 
                    <>
                    <Link to="/login" className="cursor-pointer">Login</Link>
                    <Link to='/signup' className="cursor-pointer">Signup</Link>
                    </>
                    : 
                    <>
                    <Link>Github</Link>
                    <Link to={"/contact"}>Contact</Link>
                    <img onClick={()=>setOpen(preVal => !preVal)} className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer" src={img} alt="" />
                    </>
                }
            </ul>
            {open && <NavOpen setOpen={setOpen}/>}
        </div>
    )
}

export default Nav;