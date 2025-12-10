import User from '../models/user.model.js'
import { clerkClient } from '@clerk/clerk-sdk-node'
export const getUserSavedPosts = async (req, res) => {
    try {
        const clerkUserId = req.auth().userId
        if (!clerkUserId) return res.status(401).send("Unauthorized")
        let user = await User.findOne({ clerkId: clerkUserId })
        if (!user) {
            const clerk = await clerkClient.users.getUser(clerkUserId)
            user = await User.create({
                clerkId: clerkUserId,
                username: clerk.username ?? clerk.emailAddresses[0].emailAddress.split('@')[0],
                email: clerk.emailAddresses[0].emailAddress,
                img: clerk.imageUrl ?? '',
                savedPosts: []
            })
        }
        return res.status(200).json(user.savedPosts || [])
    } catch (err) {
        console.error('>>> saved 异常', err)
        return res.status(500).json({ message: err.message })
    }
}

export const savePost = async (req, res) => {
    try {
        const clerkUserId = req.auth().userId
        const postId = req.body.postId
        if (!clerkUserId) return res.status(401).send("Unauthorized")
        const user = await User.findOne({ clerkId: clerkUserId })
        if (!user) return res.status(404).send("User not found")
        const isSaved = user.savedPosts.some(p => p === postId)
        const operator = isSaved ? '$pull' : '$push'
        await User.findByIdAndUpdate(user._id, { [operator]: { savedPosts: postId } })
        return res.status(200).json(isSaved ? "Post unsaved" : "Post saved")
    } catch (err) {
        console.error('>>> save 异常', err)
        return res.status(500).json({ message: err.message })
    }
}