import { IKImage } from "imagekitio-react";
import { Link } from "react-router-dom";
import {format} from 'timeago.js'
const Comment = ({comment}) => {
//    console.log('看看comment', comment)

    return (
        <div className="p-4 bg-slate-50 rounded-xl mb-2">
            <div className="flex gap-4 items-center">
                {comment.user.img && (
                    <IKImage    
                        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                        src={comment.user.img} 
                        className='rounded-full w-12 h-12 object-cover' w='40'
                    />
                )}
                <Link className='font-medium'>{comment.user.username}</Link>
                <span className="text-gray-500 text-sm">{format(comment.createdAt)}</span>
            </div>
            <div className="mt-4">
                <p>
                    {comment.desc}
                </p>
            </div>
        </div>
    )
}
export default Comment;