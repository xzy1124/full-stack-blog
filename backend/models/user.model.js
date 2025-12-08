import { Schema } from "mongoose"
import mongoose from "mongoose"
// 用户的配方，包括用户名、邮箱、头像、保存的帖子ID数组
const userSchem = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
    },
    savedPosts: {
        // 保存的帖子ID数组,也就是必须是字符串数组['post1','post2']
        type: [String],
        default: []
    }
},
    { timestamps: true }    
)
export default mongoose.model("User", userSchem)