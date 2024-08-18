import mongoose from "mongoose"
import { COLLECTIONS } from "../utils/collections.js"

const postSchema = new mongoose.Schema({
    useId: {
        type: String
    },
    content: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})


const PostModel = new mongoose.model(COLLECTIONS.POSTS, postSchema)

export const createPostDB = (data) => {
    return PostModel.create(data)
}



export default PostModel