import { useParams } from 'react-router-dom';
import img from '../assets/pexels-asad-photo-maldives-3293148.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav';
import { getFullDay } from '../utils/date';

const Blog = () => {
    
    const {id} = useParams();
    const [blog,setBlog] = useState(null)
    useEffect(()=>{
        axios.post("https://sem-proj-blog.vercel.app/api/auth/getblog",{id})
        .then(({data : blog}) => {
            setBlog(blog)
        })
    },[])

    return(
        <>
        <Nav/>
        {
            blog ?
        <div className="mt-5 max-w-[830px] mx-auto flex flex-col gap-6 mb-10 px-4 md:px-0">
            <div>
                <img className='w-full rounded-t-lg' src={blog && blog.banner} alt="" />
            </div>
            <div className='flex flex-col gap-5'>
                <h1 className='text-2xl font-bold'>{blog.title}</h1>
                <p className='text-textColor text-[16px] leading-[30px]'>{blog.shortdes}</p>
                <p className='text-textColor text-[16px] leading-[30px]'>{blog.longdes}</p>
            </div>
            <div className='flex flex-col gap-5'>
                <h1>posted by <span className='text-primary'>@{blog.author.name}</span></h1>
                <p>published on {getFullDay(blog.publishedAt)}</p>
            </div>
        </div> : <p className='text-center'>Loading...</p>
}
        </>
    )
}

export default Blog;
