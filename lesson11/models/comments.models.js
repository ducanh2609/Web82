import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'posts',
    },
    content: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
})

const CommentModel = mongoose.model(COLLECTIONS.COMMENTS, commentSchema)

export const countComments = () => {
    return CommentModel.countDocuments()
}
export const createCommentDB = (data) => {
    return CommentModel.create(data)
}

export const findAllComment = (payload, skip, pageSize, sort) => {
    return CommentModel.find(payload)
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
}

export default CommentModel

