import { Navigate, Outlet } from "react-router-dom";
import CheckAuth from "../auth/checkauth";

const Private = () => {
    const {auth} = CheckAuth();
    if(auth===undefined){
        return <div>Loading...</div>
    }

    return auth ? <Outlet/> : <Navigate to= "/login"/>
}

export default Private;