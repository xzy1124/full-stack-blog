// src/routes/sso-callback.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'

export default function SsoCallback() {
    const navigate = useNavigate()
    const { handleRedirectCallback } = useClerk()

    useEffect(() => {
        // 去掉 # 再交给 Clerk
        handleRedirectCallback()
            .then(() => navigate('/'))
            .catch(() => navigate('/login'))
    }, [navigate, handleRedirectCallback])

    return <div className='flex items-center justify-center h-screen'>正在完成登录…</div>
}