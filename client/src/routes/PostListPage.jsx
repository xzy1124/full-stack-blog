import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'
import { useState } from 'react'
// 文章列表页面布局，左大片文章，右边有个菜单
const PostListPage = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="">
            {/* <h1 className="mb-8 text-2xl">Development Blog</h1> */}
            <button 
                className='md:hidden bg-blue-800 text-white test-sm px-4 py-2 mb-4 rounded-2xl'
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? "Close" : "Filter or Search"}
            </button>
            <div className="flex gap-8 flex-col-reverse md:flex-row">
                <div>
                    <PostList />
                </div>
                <div className={`${open ? 'block' : 'hidden'} md:block`}>
                    <SideMenu />
                </div>
            </div>
        </div>
    )
}
export default PostListPage