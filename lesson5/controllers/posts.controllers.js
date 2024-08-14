import { createPostDB, findPostById } from "../models/posts.models.js"
import { getUserById } from "../models/users.models.js"
import { cloneDeep } from "../utils/funconstant.js"

export const createPost = async (req, res) => {
    const { userId } = req.query
    const { content, isPublic } = req.body
    try {
        const findUser = await getUserById(userId)
        if (!findUser) {
            throw new Error('User is not exist')
        }
        const newPost = {
            userId, content, isPublic
        }
        const createPostData = await createPostDB(newPost)
        res.status(201).send({
            message: 'Created!',
            post: createPostData,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

export const editPost = async (req, res) => {
    const { postId } = req.params
    const { userId } = req.query
    const { content } = req.body
    try {
        const findPost = await findPostById(postId)
        if (!findPost) throw new Error('Post not found')
        // const findUser = await getUserById(userId)
        // if (!findUser) throw new Error('User not found')
        const checkUser = userId === cloneDeep(findPost.userId)
        if (!checkUser) throw new Error('User can not edit this post')
        findPost.content = content
        findPost.save()
        res.status(200).send({
            message: 'Updated!',
            data: findPost,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}