import Post from "../models/post.model.js"
import User from "../models/user.model.js"
export const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
}
export const getPost = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug})
    res.status(200).json(post)
}
// 新增文章和删除文章肯定是需要关联用户的，所以我们才需要认证
export const createPost = async (req, res) => {
    // 新增文章时，需要关联用户,从clerk那里拿到用户id
    const clerkId = req.auth().userId
    if (!clerkId) {
        return res.status(401).json("Not authenticated")
    }
    // 从用户模型中找到对应的用户
    const user = await User.findOne({clerkId})
    if (!user) {
        return res.status(404).json("User not found")
    }
    // 展开运算符写在后面和前面不一样
    const post = new Post({userId: user._id, ...req.body})
    await post.save()
    res.status(200).json(post)
}
export const deletePost = async (req, res) => {
    const clerkId = req.auth().userId
    if (!clerkId) {
        return res.status(401).json("Not authenticated")
    }
    // 从用户模型中找到对应的用户
    const user = await User.findOne({clerkId})
    if (!user) {
        return res.status(404).json("User not found")
    }
    // 删除是通过文章id来删除的。只有用户自己的文章才能删除。
    const post = await Post.findByIdAndDelete({_id: req.params.id, userId: user._id})
    res.status(200).json("Post deleted successfully")
}