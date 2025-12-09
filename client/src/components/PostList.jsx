import PostListItem from "./PostListItem"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
/**
 * useQuery使得组件第一次渲染自动帮我们执行queryFn也就是fetchPosts
 * 把返回值原封不动放进data字段，同时帮我们管理loading,error等状态
 * return什么，data就是什么
 * @returns 
 */
const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
    return res.data
}
const PostList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetchPosts(),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    console.log(data)
    return (
        <div className="flex flex-col gap-12 mb-8">
            <PostListItem />
            <PostListItem />
            <PostListItem />
            <PostListItem />
            <PostListItem />
            <PostListItem />
            <PostListItem />
            <PostListItem />
        </div>
    )
}
export default PostList