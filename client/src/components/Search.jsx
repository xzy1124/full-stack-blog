// 因为我们在搜索的时候只想改变这一个组件，不会影响整个使用到他的组件的重新渲染
const Search = () => {
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
            <input type="text" placeholder="search a post..." className="bg-transparent" />
        </div> 
    )
}
export default Search
