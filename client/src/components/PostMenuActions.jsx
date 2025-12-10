import {useUser, useAuth} from "@clerk/clerk-react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from 'axios'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
const PostMenuActions = ({post}) => {
    const navigate = useNavigate()
    // 要认证用户之后才能看到
    const {user} = useUser()
    const {getToken} = useAuth()
    // 给data重命名为savedPosts
    const { isPending, error, data: savedPosts } = useQuery({
        queryKey: ['savedPosts'],
        queryFn: async () => {
            const token = await getToken()
            return await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        /**
         * 当 invalidateQueries 触发时：
         * 1. savedPosts 被标记为过期
         * 2. React Query 开始重新获取
         * 3. 在重新获取期间，savedPosts 可能是 undefined
         * 4. isSaved 变成 false
         * 5. 导致 UI 闪烁
         */
        // 关键，保持旧数据直到新数据到达，不然会闪烁
        // keepPreviousData: true,
    })
    const queryClient = useQueryClient()
    // some是js内置的一个方法，用来判断数组中是否有某个元素
    const isSaved = savedPosts?.data?.some((p) => p === post._id || false)
    const isAdmin = user?.publicMetadata?.role === "admin" || false
    const deleteMytation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            toast.success("Post deleted successfully")
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Delete failed")
        }
    })
    const handleDelete = () => {
        deleteMytation.mutate()
    }

    const savedMutatioon = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return await axios.patch(`${import.meta.env.VITE_API_URL}/users/save`,{
                postId: post._id,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            // 这里的作用是告诉Query,savedPosts这个数据现在已经过期了
            // 之后如果有组件使用这个数据，Query会自动重新发起请求
            queryClient.invalidateQueries({queryKey: ['savedPosts']})
            // queryClient.refetchQueries({ 
            //     queryKey: ['savedPosts'],
            //     exact: true  // 只精确匹配这个 key
            // })
        },
        onError: (error) => {
            toast.error(error.response.data.message || "save failed")
        }
    })
    const handleSaved = () => {
        if(!user){
            return navigate("/login")
        }
        savedMutatioon.mutate()
    }

    const featuredMutatioon = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return await axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`, {
                postId: post._id,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        },
        onSuccess: () => {
            // 这里的作用是告诉Query,savedPosts这个数据现在已经过期了
            // 之后如果有组件使用这个数据，Query会自动重新发起请求
            queryClient.invalidateQueries({ queryKey: ['post', post.slug] })
            // queryClient.refetchQueries({ 
            //     queryKey: ['savedPosts'],
            //     exact: true  // 只精确匹配这个 key
            // })
        },
        onError: (error) => {
            toast.error(error.response.data.message || "save failed")
        }
    })
    const handleFeatured = () => {
        featuredMutatioon.mutate()
    }
    // console.log('>>> savedPosts 原始结构', savedPosts)
    return (
        <div className="">
            <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
            {isPending ? (
                "Loading..."
            ) : error ? (
                "Save failed"
            ) : (
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSaved}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width='20px'
                        height='20px'
                    >
                        <path
                            d='M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z'
                            stroke='black'
                            strokeWidth='2'
                            fill={
                                savedMutatioon.isPending 
                                    ? isSaved 
                                        ? "none" 
                                        : "black"
                                    : isSaved 
                                        ? "black" 
                                        : "none"
                            }
                        />
                    </svg>
                    <span>Save this Post</span>
                    {savedMutatioon.isPending && <span className="text-sm">(in progress)</span>}
                </div>
            )}{
                isAdmin && (
                    <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleFeatured} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width='20px'
                            height='20px'
                        >
                            <path
                                d='M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z'
                                stroke='black'
                                strokeWidth='2'
                                fill={
                                    featuredMutatioon.isPending
                                        ? post.isFeatured
                                            ? "none"
                                            : "black"
                                        : post.isFeatured
                                            ? "black"
                                            : "none"
                                }
                            />
                        </svg>
                        <span>Feature this post</span>
                        {featuredMutatioon.isPending && <span className="text-sm">(in progress)</span>}
                    </div>
                )
            }
        
            {user && (post.user.username === user.username || isAdmin) && (
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleDelete}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* 把手 */}
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        {/* 桶身 */}
                        <path d="M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6" />
                        {/* 桶盖条纹 */}
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span>Delete this Post</span>
                    {deleteMytation.isPending && <span className="text-sm">(in progress)</span>}
                </div>
            )}

        </div>
    )
}
export default PostMenuActions