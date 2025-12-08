import Image from "./Image"
import {Link} from 'react-router-dom'
const PostListItem = () => {
    return (
        <div className="flex flex-col xl:flex-row gap-8">
            {/* Image */}
            <div className="md:hidden xl:block xl:w-1/3">
                <Image
                    src='postImg.jpeg'
                    className='rounded-3xl object-cover' 
                    w='735'
                />
            </div>
            {/* details:title、data、description */}
            <div className="flex flex-col gap-4 xl:w-2/3">
                <Link to='/text' className="text-4xl font-semibold">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>Written by</span>
                    <Link className="text-blue-800">Ziyan</Link>
                    <span>on</span>
                    <Link className="text-blue-800">Web Design</Link>
                    <span>2 days ago</span>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Eligendi reprehenderit hic consequatur ad rem, accusamus doloribus 
                    aspernatur dolorem facilis ut quam minus ex illo accusantium 
                    laudantium dolorum, quisquam sequi at.
                </p>
                <Link to='/text' className="underline text-blue-800 text-sm">Read More</Link>
            </div>
            {/* read more */}
        </div>
    )
}
export default PostListItem