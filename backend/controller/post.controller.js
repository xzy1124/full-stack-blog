import Post from "../models/post.model.js"
export const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
}
export const getPost = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug})
    res.status(200).json(post)
}
export const createPost = async (req, res) => {
    const post = new Post(req.body)
    await post.save()
    res.status(200).json(post)
}
export const deletePost = async (req, res) => {
    // 删除是通过文章id来删除的
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json("Post deleted successfully")
}