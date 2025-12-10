import User from '../models/user.model.js'
export const getUserSavedPosts = async (req, res) => {
    const clerkUserId = req.auth().userId
    if (!clerkUserId) return res.status(401).send("Unauthorized")
    const user = await User.findOne({ clerkId: clerkUserId })
    if(!user) return res.status(404).send("User not found")
    res.status(200).json(user.savedPosts)
}
export const savePost = async (req, res) => {
    const clerkUserId = req.auth().userId
    const postId = req.body.postId
    if (!clerkUserId) return res.status(401).send("Unauthorized")
    const user = await User.findOne({ clerkId: clerkUserId })
    if(!user) return res.status(404).send("User not found")
    
    const isSaved = user.savedPosts.some((p) => p === postId)
    if(!isSaved){
        await User.findByIdAndUpdate(user._id, {
            $push: { savedPosts: postId }
        })
    }else{
        await User.findByIdAndUpdate(user._id, {
            $pull: { savedPosts: postId }
        })
    }
    res.status(200).json(isSaved ? "Post unsaved" : "Post saved")
}