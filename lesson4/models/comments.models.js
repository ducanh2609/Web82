import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collection.js";

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

export default CommentModel

