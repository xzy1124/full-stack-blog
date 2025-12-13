// src/routes/sso-callback.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'

export default function SsoCallback() {
    const navigate = useNavigate()
    const { handleRedirectCallback } = useClerk()

    useEffect(() => {
        // 让 Clerk 自己处理 hash 参数，完事再跳回首页
        handleRedirectCallback({ redirectUrl: '/' })
            .then(() => navigate('/'))
            .catch(() => navigate('/login'))
    }, [])

    return <div className='flex items-center justify-center h-screen'>正在完成登录...</div>
}