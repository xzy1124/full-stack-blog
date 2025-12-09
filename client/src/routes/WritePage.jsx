import {useUser, useAuth} from '@clerk/clerk-react'
import "react-quill-new/dist/quill.snow.css"
import ReactQuill from 'react-quill-new'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {useState} from 'react'
const WritePage = () => {
    // 能否书写文章肯定要先判断是否登录状态的
    const {isLoaded, isSignedIn} = useUser()
    const [value, setValue] = useState('')
    const {getToken} = useAuth()
    const createPost = useMutation({
        mutationFn: async (newPost) => {
            //发布文章需要携带请求头的token
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
    const handleSumbit = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            title: formData.get('title'),
            category: formData.get('category'),
            desc: formData.get('desc'),
            content: value
        }
        console.log(data)
        // 调用createPost.mutate方法触发mutationFn, 并传递data作为参数,也就是那里的newPost
        createPost.mutate(data)
    }
    if(!isLoaded){
        return <div className=''>Loading...</div>
    }
    if(isLoaded && !isSignedIn) {
        return <div className=''>Your need to sign in to create a new post.</div>
    }
    return (
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
            <h1 className='text-cl font-light'>Create a New Post</h1>
            <form onSubmit={handleSumbit} className='flex flex-col gap-6 flex-1 mb-6'>
                <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover image</button>
                <input 
                    className='text-4xl font-semibold bg-transparent outline-none' 
                    type="text" 
                    placeholder='My Awesome Story' 
                    name='title'
                />
                <div className='flex items-center gap-4'>
                    <label htmlFor="" className='text-sm'>Choose a category:</label>
                    <select name="category" id="" className='rounded-xl p-2 bg-white shadow-md'>
                        <option value="general">General</option>
                        <option value="web-design">Web Design</option>
                        <option value="development">Development</option>
                        <option value="databases">Databases</option>
                        <option value="seo">Search Engines</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <textarea className='p-4 rounded-xl bg-white shadow-md' name="desc" placeholder='A short Description' />
                <ReactQuill 
                    theme="snow" 
                    className='flex-1 rounded-xl bg-white shadow-md' 
                    value={value}
                    onChange={setValue}
                />
                <button className='bg-blue-800 text-white rounded-xl w-36 p-2 mt-4 font-medium'>Send</button>
            </form>
        </div>
    )
}
export default WritePage