import { useEffect, useState } from "react";
import BlogCard from "../components/blog_card";
import axios from "axios"
import { Link } from "react-router-dom";
import CheckAuth from "../auth/checkauth";
import Nav from "../components/nav";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [searchterm,setSearchTerm] = useState("")
    useEffect(() => {
        if (!blogs) {
            axios.get("https://sem-proj-blog.vercel.app/api/auth/getblogs")
                .then(({ data }) => {
                    setBlogs(data);
                })
        }
    }, [])
    console.log(blogs)
    return (
        <>
        <Nav/>
        <div className="mt-5 px-4 md:px-0">
            <div className="max-w-[450px] mx-auto  flex my-10">
                <input value={searchterm} onChange={(e) => setSearchTerm(e.target.value)} className="py-3 rounded-l-full pl-8 bg-gray-300" type="text" />
                <button className="bg-primary px-4 rounded-r-full text-white ">search</button>
            </div>
            {
                !blogs ? <p className="text-center">Loading...</p> : (
                    blogs.filter((blog) => blog.title.toLowerCase().includes(searchterm.toLowerCase()))?.map((blog) => {
                        return <Link to={`/blog/${blog._id}`} key={blog._id} ><BlogCard title={blog.title} longdes={blog.longdes} shortdes={blog.shortdes} author={blog.author} banner={blog.banner} publishedAt={blog.publishedAt} /></Link>
                    })
                )
            }
        </div>
        </>
    )
}

export default Home;
