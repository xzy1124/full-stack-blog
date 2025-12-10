import { IKImage } from "imagekitio-react";
import { Link } from "react-router-dom";
import {format} from 'timeago.js'
import {useAuth, useUser} from '@clerk/clerk-react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
const Comment = ({comment, postId}) => {
//    console.log('看看comment', comment)
    const { getToken } = useAuth()
    const { user } = useUser()
    const role = user?.publicMetadata?.role

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            //发布文章需要携带请求头的token
            const token = await getToken()
            return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            toast.success('Comment deleted successfully!')
        },
        onError: (err) => {
            toast.error(err.message)
        },
    })

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
                {user && (comment.user.username === user.username || role === 'admin') && (
                    <span 
                        className="text-red-300 text-xl hover:text-red-500 cursor-pointer" 
                        onClick={() => mutation.mutate()}
                    >
                        delete
                        {mutation.isPending && <span>(in process...)</span>}
                    </span>
                    
                )}
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