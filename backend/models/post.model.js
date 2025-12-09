import { Schema } from "mongoose"
import mongoose from "mongoose"
// 文章的配方，包括用户ID，标题，封面，类别，描述，内容，是否精选，访问次数
const postSchem = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "user",
        required: true
    },
    img: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "general"
    },
    // slug的作用是文章的url，比如https://blog.com/post/12789012
    // 12789012就是slug
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String
    },
    content: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    visit: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }    
)
export default mongoose.model("Post", postSchem)
