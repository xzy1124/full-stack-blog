import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import WritePage from './routes/WritePage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import About from './routes/About.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';

// ① 声明允许的来源
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://full-stack-blog-vncx.vercel.app'
]

if (!allowedOrigins.includes(window.location.origin)) {
  console.warn('Untrusted origin:', window.location.origin)
}

const queryClient = new QueryClient()
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children:[
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: '/posts',
          element: <PostListPage />
        },
        {
          // slug是一个动态参数，可以匹配任何一段字符串
          path: '/:slug',
          element: <SinglePostPage />
        },
        {
          path: '/write',
          element: <WritePage />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        },
        {
          path: '/about',
          element: <About />
        },
      ]
    }
  ]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="https://full-stack-blog-vncx.vercel.app"
      signUpFallbackRedirectUrl="https://full-stack-blog-vncx.vercel.app"
      afterSignOutUrl="https://full-stack-blog-vncx.vercel.app"
    >
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="bottom-right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)
