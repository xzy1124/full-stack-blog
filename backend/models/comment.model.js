import { Schema } from "mongoose"
import mongoose from "mongoose"
// 评论的配方，包括描述，内容，用户ID，帖子ID
const commentSchem = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId, 
        ref: "Post",
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // 这两个不要必须字段
        // required: true,
        // unique: true
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
export default mongoose.model("Comment", commentSchem)
