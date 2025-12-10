import Comment from "./Comment"
import axios from "axios"
import { toast } from 'react-toastify'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
const fetchCommits = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return res
}

const Comments = ({postId}) => {
    const {getToken} = useAuth()
    const {user} = useUser()
    const { isPending, error, data } = useQuery({
        // 用来缓存/失效/重新获取这组数据。
        // 只要 key 变，RQ 就认为“这是另一份数据”，会重新发请求。
        queryKey: ['comments', postId],
        queryFn: () => fetchCommits(postId)
    })
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            //发布文章需要携带请求头的token
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            invalidateQueries
        },
        onError: (err) => {
            toast.error(err.message)
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('提交了')
        const formData = new FormData(e.target)
        const commentData = {
            desc: formData.get('desc')
        }
        console.log('即将mutate', commentData)
        mutation.mutate(commentData)
    }
    // console.log('看看data', data)
    return (
        <div className="flex flex-col gap-8 lg:w-3/5">
            <h1 className="text-xl text-gray-500 underline">Comments</h1>
            <form 
                onSubmit={handleSubmit}
                className="flex items-center gap-8 justify-between w-full"
            >
                <textarea 
                    className="rounded-xl p-4 w-full" 
                    placeholder="Write a comment" 
                    name="desc"
                />
                <button className="rounded-xl bg-blue-800 px-4 py-3 font-medium text-white">Send</button>
            </form>
            {isPending
                ? ("Loading...")
                : error
                ? ("Error loading comments!")
                : (
                    <>
                        {mutation.isPending && (
                            <Comment    
                                comment={{
                                    desc: `${mutation.variables?.desc} (Sending...)`,
                                    createdAt: new Date(),
                                    user: {
                                        img: user.imageUrl,
                                        username: user.username,
                                    },
                                }}
                            />
                        )}
                        {data?.data?.map((comment) => (
                            <Comment key={comment._id} comment={comment} />
                        ))} 
                    </>
                )
            }
        </div>
    )
}
export default Comments;