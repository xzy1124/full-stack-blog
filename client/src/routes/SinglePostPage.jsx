import { Link, useParams } from "react-router-dom"
import Image from "../components/Image"
import {IKImage} from 'imagekitio-react'
import PostMenuActions from "../components/PostMenuActions"
import Search from "../components/Search"
import Comments from "../components/Comments"
import axios from 'axios'
import { useQuery } from "@tanstack/react-query"   
import {format} from 'timeago.js'
const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
    return res
}
const SinglePostPage = () => {

    const {slug} = useParams()
    const {isPending, error, data} = useQuery({
        queryKey: ['post', slug],
        queryFn: () => fetchPost(slug)
    })
    // console.log('看看data', data)
    if(isPending) return "loading..."
    if(error) return "some error"+error.message
    if(!data?.data) return "Post not found"
    return (
        <div className="flex flex-col gap-8">
            {/* details */}
            <div className="flex gap-8">
                {/* title、data、description */}
                <div className="lg:w-3/5 flex flex-col gap-8">
                    <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
                        {data.data.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Writtern by</span>
                        <Link className="text-blue-800">{data.data.user.username}</Link>
                        <span>on</span>
                        <Link className="text-blue-800">{data.category}</Link>
                        <span>{format(data.data.createdAt)}</span>
                    </div>
                    <p className="text-gray-500 font-medium">
                        {data.data.desc}
                    </p>
                </div>
                {data.data.user.img && (<div className="hidden lg:block w-2/5">
                    <Image
                        // urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                        // src当 src 以 http 开头时，IKImage 会直接透传，不再拼接自己的域名，也就不会 404。
                        src={data.data.img} // 完整公网 URL
                        className='rounded-2xl object-cover' 
                        w='600'
                    />
                </div>)}
            </div>
            {/* content */}
            <div className="flex flex-col md:flex-row gap-12">
                <div
                    className="lg:text-lg flex flex-col gap-6 text-justify"
                    dangerouslySetInnerHTML={{ __html: data.data.content }}
                />  
                 {/*menu  */}
                 <div className="px-4 h-max sticky top-8">
                    {/* Author */}
                    <h1 className="mb-4 text-sm font-medium">Author</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-8">
                            {data.data.user.img && (
                                <IKImage
                                    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                                    // src当 src 以 http 开头时，IKImage 会直接透传，不再拼接自己的域名，也就不会 404。
                                    src={data.data.user.img} // 完整公网 URL
                                    className="w-12 h-12 rounded-full object-cover"
                                    width={48}
                                    height={48}
                                    loading="lazy"
                                />
                            )}
                            <Link className="text-blue-800">{data.data.user.username}</Link>
                        </div>
                        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className="flex gap-2">
                            <Link>
                                <Image src='facebook.svg' />
                            </Link>
                            <Link>
                                <Image src='instagram.svg' />
                            </Link>
                        </div>
                    </div>
                    {/* Actions */}
                    <PostMenuActions post={data.data}/>
                    {/* Categories */}
                    <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link className="underline text-blue-800">All</Link>
                        <Link className="underline text-blue-800">Web Desaign</Link>
                        <Link className="underline text-blue-800">Development</Link>
                        <Link className="underline text-blue-800">Databases</Link>
                        <Link className="underline text-blue-800">Search Engines</Link>
                        <Link className="underline text-blue-800">Marketing</Link>
                    </div>
                    {/* search */}
                    <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
                    <Search />
                 </div>
            </div>
            {/* Comment */}
            <Comments postId={data.data._id} />
        </div>
    )
}
export default SinglePostPage