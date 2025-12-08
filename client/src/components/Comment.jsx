import Image from "./Image";
import { Link } from "react-router-dom";
const Comment = () => {
    return (
        <div className="p-4 bg-slate-50 rounded-xl mb-8">
            <div className="flex gap-4 items-center">
                <Image src='userImg.jpeg' className='rounded-full w-12 h-12 object-cover' w='40'/>
                <Link className='font-medium'>Ziyan</Link>
                <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            <div className="mt-4">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi reprehenderit hic consequatur ad rem, accusamus doloribus
                    tempora.
                </p>
            </div>
        </div>
    )
}
export default Comment;