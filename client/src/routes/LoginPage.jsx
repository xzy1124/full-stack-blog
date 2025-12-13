import { SignIn } from '@clerk/clerk-react'
const LoginPage = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            <SignIn 
                signInUrl="/register"
                redirectUrl="https://full-stack-blog-vncx.vercel.app"
             />
        </div>
    )
}
export default LoginPage