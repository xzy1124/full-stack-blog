import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import ImageKit from 'imagekit';
export const getPosts = async (req, res) => {
    // req.query就是url中?后面的参数，req他就是有这个能力，它的query属性能够获取到所有的参数
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 2

    const query = {}

    const cat = req.query.cat
    const author = req.query.author
    const searchQuery = req.query.search
    const sortQuery = req.query.sort
    const featured = req.query.featured

    if(cat){
        query.category = cat
    }
    if(searchQuery){
        query.title = {$regex: searchQuery, $options: "i"}
    }
    if(author){
        const user = await User.findOne({username: author}).select("_id")

        if(!user){
            return res.status(404).json("Author not found")
        }
        query.user = user._id
    }
    let sortObj = {createdAt: -1}
    if(sortQuery){
        switch(sortQuery){
            case "newest":
                sortObj = {createdAt: -1}
                break
            case "oldest":
                sortObj = {createdAt: 1}
                break
            case "popular":
                sortObj = {visit: 1}
                break
            case "trending":
                sortObj = {visit: -1}
                query.createdAt = {
                    $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                }
                break
            default:
                break
        } 
    }

    const posts = await Post.find(query)
        .populate("user", "username")
        .sort(sortObj)
        .limit(limit)
        .skip((page - 1) * limit)
    // console.log('>>> populate 结果', posts)  
    const totalPosts = await Post.countDocuments()
    const hasMore = page * limit < totalPosts

    res.status(200).json({posts, hasMore})
}
export const getPost = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug}).populate("user", "username img")
    res.status(200).json(post)
}
// 新增文章和删除文章肯定是需要关联用户的，所以我们才需要认证
export const createPost = async (req, res) => {
    // 新增文章时，需要关联用户,从clerk那里拿到用户id
    const clerkUserId = req.auth().userId
    // console.log(req.headers)
    if (!clerkUserId) {
        return res.status(401).json("Not authenticated")
    }
    console.log('🔑 clerkUserId:', clerkUserId);
    console.log('📄 请求头 authorization:', req.headers.authorization);
    // 从用户模型中找到对应的用户
    const user = await User.findOne({ clerkId: clerkUserId })
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
    const clerkUserId = req.auth().userId
    if (!clerkUserId) {
        return res.status(401).json("Not authenticated")
    }
    // 检查用户是否是管理员
    const role = req.auth().sessionClaims?.metadata?.role || "user"
    if(role === "admin"){
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json("Post deleted successfully")
    }

    // 从用户模型中找到对应的用户
    const user = await User.findOne({ clerkId: clerkUserId })
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
export const featurePost = async (req, res) => {
    const clerkUserId = req.auth().userId
    const postId = req.body.postId
    if (!clerkUserId) {
        return res.status(401).json("Not authenticated")
    }
    // 检查用户是否是管理员
    const role = req.auth().sessionClaims?.metadata?.role || "user"
    if (role !== "admin") {
        return res.status(403).json("Only admins can feature posts")
    }
    const post = await Post.findById(postId)
    const isFeatured = post.isFeatured

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            isFeatured: !isFeatured,
        },
        { new: true }
    )
    res.status(200).json(updatedPost)
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})
export const uploadAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result)
}
