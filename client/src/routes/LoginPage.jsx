import { SignIn } from '@clerk/clerk-react'
const LoginPage = () => {
    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            <SignIn // 注册成功
                signUpUrl="/register"                                      // 本地注册页
            />
        </div>
    )
}
export default LoginPage