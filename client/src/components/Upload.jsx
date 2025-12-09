import { IKContext, IKUpload } from 'imagekitio-react'
import { toast } from 'react-toastify'
import { useRef } from 'react'
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
const Upload = ({children, type, setProgress, setCover}) => {
    // 用来操控我们的上传组件的类型，使用useRef
    const ref = useRef(null)

    const onError = (error) => {
        console.error('Upload error:', error);
        toast.error('Upload failed. Please try again.');
    };
    const onSuccess = (response) => {
        console.log('Upload success:', response);
        // toast.success('Upload successful!');
        setCover(response)
    };
    const onProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100))
    }
    return (
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
                className='hidden' 
                // 点击我们的div触发点击事件，从而触发上传组件的点击事件
                ref={ref}
                accept={`${type}/*`}
            />
        <div className='cursor-pointer' onClick={() => ref.current.click()}>
            {children}
        </div>
        </IKContext>
    )
}
export default Upload
