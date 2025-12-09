import Image from "./Image"
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
const PostListItem = ({post}) => {
    // console.log(post.img)
    return (
        <div className="flex flex-col xl:flex-row gap-8 mb-8">
            {/* Image */}
            {post.img && (<div className="md:hidden xl:block xl:w-1/3">
                <Image
                    src={post.img}
                    className="rounded-3xl object-cover"
                    w="735"
                />
            </div>)}
            {/* details:title、data、description */}
            <div className="flex flex-col gap-4 xl:w-2/3">
                <Link to='/text' className="text-4xl font-semibold">
                    {post.title}
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>Written by</span>
                    <Link className="text-blue-800">{post.user?.username ?? 'Deleted user'}</Link>
                    <span>on</span>
                    <Link className="text-blue-800">{post.category}</Link>
                    <span>{format(post.createdAt)}</span>
                </div>
                <p>
                    {post.desc}
                </p>
                <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">Read More</Link>
            </div>
            {/* read more */}
        </div>
    )
}
export default PostListItem