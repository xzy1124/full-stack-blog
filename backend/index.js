import express from 'express';
import userRouter from './routes/user.route.js'
import commentRouter from './routes/comment.route.js'
import postRouter from './routes/post.route.js'
import connectDB from './lib/connectDB.js'
import webhookRouter from './routes/webhook.route.js'
import {clerkMiddleware} from '@clerk/express'
import cors from 'cors'
import ImageKit from 'imagekit'; // 官方同样支持 Node-ESM
const app = express()
// app.use(cors(process.env.VCLERK_URL))
// 修改为：
const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://full-stack-blog-vncx.vercel.app'
]

app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true
}))

// Clerk 中间件初始化，作用是在每个请求中添加 req.auth 对象，
// 该对象包含了当前请求的认证状态，如用户 ID、角色等。
app.use(clerkMiddleware())
// 为什么要在 webhook 路由之前挂载 JSON 解析中间件？
// 因为 webhook 路由需要访问原始请求体，而 JSON 解析中间件会将请求体解析为 JavaScript 对象，
// 并将其挂载在 req.body 上，方便后续路由处理。
app.use("/webhooks", webhookRouter)
// 把客户端发来的 JSON 字符串解析成 JavaScript 对象，然后挂在 req.body 上
app.use(express.json())

// allow cross-origin requests
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.get("/auth-state", (req, res) => {
//     const authState = req.auth()
//     res.json(authState)
// })

// app.get("/protect", (req, res) => {
//     const {userId} = req.auth()
//     if(!userId) {
//         return res.status(401).json({message: "未认证"})
//     }
//     res.status(200).json({message: "认证成功"})
// })

// app.get("/protect2", requireAuth(), (req, res) => {
//     res.status(200).json({ message: "认证成功" })
// })

// 挂载路由
app.use("/users", userRouter)
app.use("/comments", commentRouter)
app.use("/posts", postRouter)

// 处理错误,统一兜底
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500)
    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack,
    })
})
app.listen(3000,() => {
    connectDB()
    console.log("Server is running!")
})
