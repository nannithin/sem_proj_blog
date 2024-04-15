import { getDay } from "../utils/date";


const BlogCard = ({title,longdes,shortdes,author,banner,publishedAt}) => {
    return(
        
            <div className="flex items-center max-w-[830px] mx-auto gap-5 py-7 border-b-2 border-textColor cursor-pointer">
            <img className='w-[100px] h-[100px] md:w-[130px] md:h-[130px] object-cover ' src={banner} alt="" />
            <div className=''>
                <h1 className='line-clamp-2 font-semibold text-[15px] md:text-[19px]'>{title}</h1>
                <p className='line-clamp-2 text-textColor text-[13px] md:text-[16px] my-2'>{shortdes}</p>
                <div className='flex justify-between mx-3 text-textColor text-[14px] mt-3'>
                    <p>@{author && author.name}</p>
                    <p>{getDay(publishedAt)}</p>
                </div>
            </div>
        </div>
        
    )
}

export default BlogCard;