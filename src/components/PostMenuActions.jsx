const PostMenuActions = () => {
    return (
        <div className="">
            <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
            <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
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
                    />
                </svg>
                <span>Save this Post</span>
            </div>
            <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
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
            </div>
        </div>
    )
}
export default PostMenuActions