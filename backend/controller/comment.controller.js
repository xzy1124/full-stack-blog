import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
export const getPostComments = async (req, res) => {
    const comments = await Comment.find({post:req.params.postId})
        .populate("user", "username img")
        .sort({ createdAt: -1})
    res.status(200).json(comments)
}
export const addComments = async (req, res) => {
    try {
        const clerkUserId = req.auth().userId
        const postId = req.params.postId
        if (!clerkUserId) return res.status(401).json({ message: '未登录' })

        const user = await User.findOne({ clerkId: clerkUserId })
        if (!user) return res.status(404).json({ message: 'User not found' })

        // console.log('>>> 收到 body', req.body) // 1. 看字段
        const newComment = new Comment({
            ...req.body,
            user: user._id,
            post: postId
        })
        const savedComment = await newComment.save()
        res.status(201).json(savedComment)
    } catch (err) {
        console.error('>>> 控制器异常', err) // 2. 捕获任何异常
        res.status(500).json({ message: err.message })
    }
}
export const deleteComments = async (req, res) => {
    const clerkUserId = req.auth.userId
    // 从请求参数中获取评论ID
    const id = req.params.id

    if (!clerkUserId) {
        return res.status(401).json({ message: "未登录" })
    }
    // 检查用户是否是管理员
    const role = req.auth().sessionClaims?.metadata?.role || "user"
    if(role === "admin"){
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json("Comment deleted successfully")
    }
    const user = await User.findOne({ clerkUserId })
    const deletedComment = await Comment.findOneAndDelete({
        _id: id,
        user: user._id
    })
    if(!deletedComment){
        return res.status(404).json('You can only delete your own comments')
    }
    res.status(200).json('Comment deleted!')
}