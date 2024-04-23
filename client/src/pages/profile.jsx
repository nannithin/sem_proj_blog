import { useContext, useEffect, useState } from 'react';
import img from '../assets/pexels-asad-photo-maldives-3293148.jpg'
import { UserContext } from '../App';
import axios from 'axios';
import Nav from '../components/nav';
import { getFullDay } from '../utils/date';
import toast, { Toaster } from 'react-hot-toast';


const Profile = () => {
    const {setUserAuth} = useContext(UserContext);
    const [user,setUser] = useState(null);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")

    const updatehandler = () => {
        axios.post("https://sem-proj-blog.onrender.com/api/auth/updateuser",{name,email},{withCredentials : true})
        .then(({data}) => {
            if(data == 'updated'){
                setUserAuth({name,email,status : 'success'})
                localStorage.removeItem('user');
                localStorage.setItem('user',JSON.stringify({name,email,status : 'success'}));
                toast.success("Updated 👍")
            }
        })
    }

   useEffect(() => {
    axios.get("http://localhost:3000/api/auth/getuser",{withCredentials : true})
   .then(({data : {user}}) => {
    console.log(user)
    setUser(user)
    setEmail(user.email);
    setName(user.name)
   })
   },[])


    return(
        <>
        <Nav/>
        <Toaster/>
        {
            user ? <div className="max-w-[550px] mx-auto text-textColor mt-10 flex flex-col px-5 gap-5">
            <img className='w-[200px] h-[200px] object-cover rounded-full mx-auto' src={img} alt="" />
            <div>
                <p className='mb-3'>Name</p>
                <input className="py-3 pl-8 rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} name="" id="" />
            </div>
            <div>
                <p className='mb-3'>Email</p>
                <input className="py-3 pl-8 rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="" id="" />
            </div>
            <button onClick={updatehandler} className="bg-primary w-full text-white rounded-md py-4 text-[17px] md:text-[19px] duration-200 hover:bg-primary/90">UPDATE</button>
            <p><span className='text-black'>{user.blogs.length}</span> Blogs published</p>
            <p>Created account on <span className='text-black'>{getFullDay(user.joinedAt)}</span></p>
        </div> : <p className='text-center'>Loading...</p>
        }
        </>
    )
}

export default Profile;
