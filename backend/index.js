import express from 'express';
import userRouter from './routes/user.route.js'
import commentRouter from './routes/comment.route.js'
import postRouter from './routes/post.route.js'
import connectDB from './lib/connectDB.js'
import webhookRouter from './routes/webhook.route.js'
const app = express()
// Register webhook routes before the JSON body parser so route-level raw body
// middleware can access the original request body for signature verification.
app.use("/webhooks", webhookRouter)
// 把客户端发来的 JSON 字符串解析成 JavaScript 对象，然后挂在 req.body 上
app.use(express.json())
app.use("/users", userRouter)
app.use("/comments", commentRouter)
app.use("/posts", postRouter)

// 处理错误,统一兜底
app.use((error, req, res, next) => {
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
