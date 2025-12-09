import PostListItem from "./PostListItem"
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component"
/**
 * useQuery使得组件第一次渲染自动帮我们执行queryFn也就是fetchPosts
 * 把返回值原封不动放进data字段，同时帮我们管理loading,error等状态
 * return什么，data就是什么
 * @returns 
 */
const fetchPosts = async (pageParam) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params:{ page: pageParam, limit: 2}
    })
    return res.data
}
const PostList = () => {
    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        promise,
        ...result
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => fetchPosts(pageParam),
        initialPageParam: 1,
        // pages是一个数组，如果最后一页有下一页，那么下一页的页码就是pages的长度加1
        getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
        getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
            firstPage.prevCursor,
    })
    //     data.pages 是“每一页”组成的数组
    //     [
    //     { posts: [/* 第1页 10条 */] },
    //     { posts: [/* 第2页 10条 */] },
    //     { posts: [/* 第3页 10条 */] }
    //     ]
    // flatMap 把每页的 posts 拆出来，再合并成一条长列表
    // const allPosts = data.pages.flatMap(page => page.posts)
    // 结果：[post1, post2, ..., post30] （一层数组）
    if (result.status === 'pending') return 'Loading...'

    if (result.status === 'error') return 'Something went wrong'

    const allPosts = result.data?.pages.flatMap(page => page.posts) || []
    // console.log(result.data)
    return (
        <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more posts...</h4>}
            endMessage={
                <p>
                    <b>All posts loaded!</b>
                </p>
            }
        >
            {allPosts.map((post) => (
                <PostListItem key={post._id} post={post} />
            ))}
        </InfiniteScroll>

    )
}
export default PostList