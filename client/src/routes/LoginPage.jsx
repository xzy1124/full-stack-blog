import { SignIn } from '@clerk/clerk-react'
const LoginPage = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            <SignIn
                signUpUrl="/register"
                forceRedirectUrl="https://full-stack-blog-vncx.vercel.app"   // 登录成功必跳
                fallbackRedirectUrl="https://full-stack-blog-vncx.vercel.app" // 任何失败/异常也跳回
            />
        </div>
    )
}
export default LoginPage