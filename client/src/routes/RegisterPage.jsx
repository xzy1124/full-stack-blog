import { SignUp } from '@clerk/clerk-react'
const RegisterPage = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            <SignUp
                signInUrl="/login"
                forceRedirectUrl="https://full-stack-blog-vncx.vercel.app"   // 注册成功必跳
                fallbackRedirectUrl="https://full-stack-blog-vncx.vercel.app" // 失败也跳回
            />
        </div>
    )
}
export default RegisterPage