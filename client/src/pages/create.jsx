import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultBlog from '../assets/blog banner.png'
import {getDownloadURL,getStorage,ref,uploadBytesResumable,} from 'firebase/storage';
import { app } from "../utils/firebase";
import Nav from "../components/nav";
import toast, { Toaster } from 'react-hot-toast'


const Create = () => {
    const maxDesLimit = 300;
    const maxLongDesLimit = 700;
    const [longdes,setLongDes] = useState("")
    const [shortdes,setShortDes] = useState("")
    const [title,setTitle] = useState("")
    const navigate = useNavigate();
    const filePickerRef = useRef();
    let loadingToast;

    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            loadingToast = toast.loading("Uploading...");
        }
    }

    const uploadImage = async() => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,imageFile);
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            

        },
        (error)=>{
            console.log(error)
            toast.dismiss(loadingToast);
            toast.error("Failed")
            setImageFile(null);
            setImageFileUrl(null);
            
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                toast.dismiss(loadingToast);
                setImageFileUrl(downloadURL);
                toast.success("Uploaded 👍")
            })
        }
        )
    }

    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile])

    const handleError = (e) => {
        let img = e.target;
        img.src = defaultBlog;
    }
    
    const publishhandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/auth/createblog",{title,shortdes,longdes,banner : imageFileUrl},{ withCredentials: true })
        .then(({data}) => {
            if(data == 'published'){
                navigate("/")
            }
        })
    }

    return(
        <>
        <Nav/>
        <div className="mt-5 px-4 md:px-0 max-w-[500px] mx-auto flex flex-col justify-center items-center mb-10 text-textColor gap-5">
            <Toaster/>
            <div>
               <input className="hidden" type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
               <div onClick={() => filePickerRef.current.click()}  className=" cursor-pointer rounded-lg text-center w-full bg-secondary ">
                    <img onError={handleError} src={imageFileUrl ? imageFileUrl : ""} alt="" />
                </div>
            </div>
            <div className="w-full">
                <p className="mb-[3px]">Title</p>
                <textarea value={title} onChange={(e) => setTitle(e.target.value)} className="resize-none w-full bg-secondary h-[70px] outline-none pl-5 pt-4"></textarea>
            </div>
            <div className="w-full">
                <p className="mb-[3px]">short description</p>
                <textarea maxLength={maxDesLimit} value={shortdes} onChange={(e) => setShortDes(e.target.value)} className="resize-none w-full bg-secondary h-[100px] outline-none pl-5 pt-4"></textarea>
                <p className="float-right">{maxDesLimit - shortdes.length} characters left</p>
            </div>
            <div className="w-full">
                <p className="mb-[3px]">Long description</p>
                <textarea maxLength={maxLongDesLimit} value={longdes} onChange={(e) => setLongDes(e.target.value)} className="resize-none w-full bg-secondary h-[150px] outline-none pl-5 pt-4"></textarea>
                <p className="float-right">{maxLongDesLimit - longdes.length} characters left</p>
            </div>
            <button onClick={publishhandler} className="bg-primary w-full text-white rounded-md py-4 text-[17px] md:text-[19px] duration-200 hover:bg-primary/90">PUBLISH</button>
        </div>
        </>
    )
}

export default Create;