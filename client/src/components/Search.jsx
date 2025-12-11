import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// 因为我们在搜索的时候只想改变这一个组件，不会影响整个使用到他的组件的重新渲染
const Search = () => {
    const location = useLocation()
    const navigate= useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value
            /**
             * 当我们在搜索框中输入内容后，点击回车，我们希望能够根据输入的内容进行搜索
             * 1. 如果当前路径是 /posts，我们希望能够在 /posts 页面中进行搜索
             * 2. 如果当前路径不是 /posts，我们希望能够跳转到 /posts 页面并在查询参数中包含搜索内容
             */
            if(location.pathname === "/posts"){
                /**
                 * “search 哪来的？”
                    不是钩子自带的，是我们自己起的名字：
                    setSearchParams({ search: query }) 会把地址栏变成 ?search=vue。
                    后端/列表组件里用 req.query.search 就能拿到这个值
                 */
                setSearchParams({...Object.fromEntries(searchParams), search: query })
            }else {
                navigate(`/posts?search=${query}`)
            }
        }
    }
    return (
        <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
            {/* 搜索框是一个图标和输入框组成的 */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                // stroke的意思是描边的颜色
                stroke="gray"
            >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input type="text" placeholder="search a post..." className="bg-transparent" onKeyDown={handleKeyPress}/>
        </div> 
    )
}
export default Search
