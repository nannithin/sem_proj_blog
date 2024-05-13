import axios from "axios";
import { useEffect, useState } from "react";

const CheckAuth = () => {
    const [auth,setAuth] = useState();

    const islogin = async()=> {
        try {
            const resp = await axios.get("https://sem-proj-blog.onrender.com/api/auth/islogin",{
                withCredentials : true
            });
            console.log(resp);
            return resp.data;
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        (
            async () =>{
                const data = await islogin();
                setAuth(data)
            }
        )()
    })
    return {auth}
}

export default CheckAuth;
