import Search from "./Search"
import { Link } from "react-router-dom"
const SideMenu = () => {
    return (
        <div className="px-4 h-max sticky top-8">
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search />
            <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name='sort' 
                        value='newest' 
                        className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 rounded-sm cursor-pointer bg-white checked:bg-blue-800"/>
                    Newest
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name='sort'
                        value='popular'
                        className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 rounded-sm cursor-pointer bg-white checked:bg-blue-800" />
                    Most Popular
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name='sort'
                        value='trending'
                        className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 rounded-sm cursor-pointer bg-white checked:bg-blue-800" />
                    Trending
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name='sort'
                        value='oldest'
                        className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 rounded-sm cursor-pointer bg-white checked:bg-blue-800" />
                    Oldest
                </label>
            </div>
            <h1 className="mb-4 mt-8 text-sm font-medium">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
                <Link className="underline" to='/posts'>All</Link>
                <Link className="underline" to='/posts?category=web-design'>Web Design</Link>
                <Link className="underline" to='/posts?category=development'>Development</Link>
                <Link className="underline" to='/posts?category=databases'>Databases</Link>
                <Link className="underline" to='/posts?category=seo'>Search Engines</Link>
                <Link className="underline" to='/posts?category=marketing'>Marketing</Link>
            </div>
        </div>
    )
}
export default SideMenu
