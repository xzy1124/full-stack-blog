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
    // console.log(req.headers)
    if (!clerkId) {
        return res.status(401).json("Not authenticated")
    }
    // 从用户模型中找到对应的用户
    const user = await User.findOne({clerkId})
    if (!user) {
        return res.status(404).json("User not found")
    }
    // 因为我们还缺少一个slug，这个不应该由用户编写，应该由后端来生成
    let slug = req.body.title.replace(/ /g, '-').toLowerCase()
    // 检查slug是否已经存在了
    let postCount = await Post.findOne({slug})
    let counter = 2
    while(postCount){
        slug = `${slug}-${counter}`
        postCount = await Post.findOne({slug})
        counter++
    }
    // 展开运算符写在后面和前面不一样
    const post = new Post({user: user._id, slug, ...req.body})
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
    const post = await Post.findByIdAndDelete({_id: req.params.id, user: user._id})
    // 判断一下有自己的帖子才能删除,要是没找到那就说明没有权限删除
    if(!post){
        return res.status(403).json("You can only delete your own posts")
    }
    res.status(200).json("Post deleted successfully")
}