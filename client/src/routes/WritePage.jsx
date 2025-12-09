import {useUser, useAuth} from '@clerk/clerk-react'
import "react-quill-new/dist/quill.snow.css"
import ReactQuill from 'react-quill-new'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IKContext, IKUpload } from 'imagekitio-react'

const authenticator = async () => {
    try {
        // Perform the request to the upload authentication endpoint.
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
        if (!response.ok) {
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        // Parse and destructure the response JSON for upload credentials.
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};
const WritePage = () => {
    // 能否书写文章肯定要先判断是否登录状态的
    const {isLoaded, isSignedIn} = useUser()
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [cover, setCover] = useState('')
    const [progress, setProgress] = useState(0)
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
        },
        onSuccess: (res) => {
            toast.success('Post created successfully')
            navigate(`/${res.data.slug}`)
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
       
        // 调用createPost.mutate方法触发mutationFn, 并传递data作为参数,也就是那里的newPost
        createPost.mutate(data)
        console.log(data)
    }
    const onError = (error) => {
        console.error('Upload error:', error);
        toast.error('Upload failed. Please try again.');
    };
    const onSuccess = (response) => {
        console.log('Upload success:', response);
        toast.success('Upload successful!');
        setCover(response)
    };
    const onProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100))
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
                {/* <button 
                    className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'
                >
                    Add a cover image
                </button> */}
                <IKContext
                    publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
                    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                    authenticator={authenticator}
                >
                    <IKUpload 
                        useUniqueFileName
                        onError={onError}  
                        onSuccess={onSuccess}
                        onUploadProgress={onProgress}  
                    />
                </IKContext>
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
                <div className='flex'>
                    <div className='flex flex-col gap-2 mr-2'>
                        <div className='cursor-pointer'>🖼</div>
                        <div className='cursor-pointer'>📼</div>
                    </div>
                    <ReactQuill
                        theme="snow"
                        className='flex-1 rounded-xl bg-white shadow-md'
                        value={value}
                        onChange={setValue}
                    />
                </div>
                <button 
                    disabled={createPost.isPending || (0 >= progress && progress < 100)}
                    className='bg-blue-800 text-white rounded-xl w-36 p-2 mt-4 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed'
                >
                    {createPost.isPending ? '...Loading' : 'Send'}
                </button>
                {"progress: " + progress + "%"}
                {createPost.isError && <span>{createPost.error.message}</span>}
            </form>
        </div>
    )
}
export default WritePage