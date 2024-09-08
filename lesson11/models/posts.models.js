import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
    },
    content: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
})

const PostModel = mongoose.model(COLLECTIONS.POSTS, postSchema)

export default PostModel


export const countPost = () => {
    return PostModel.countDocuments()
}

export const createPostDB = (data) => {
    return PostModel.create(data)
}

export const findAllPost = (payload, skip, pageSize) => {
    return PostModel.find(payload)
        .populate('userId')
        .skip(skip)
        .limit(pageSize)
}

export const findPostById = (id) => {
    return PostModel.findById(id)
}