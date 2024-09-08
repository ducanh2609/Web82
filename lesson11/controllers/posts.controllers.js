import { countPost, createPostDB, findAllPost, findPostById } from "../models/posts.models.js"
// import { getUserById } from "../models/users.models.js"

export const createPost = async (req, res) => {
    const { userId } = req.query
    const { content, isPublic } = req.body
    try {
        // const findUser = await getUserById(userId)
        // if (!findUser) throw new Error('Unauthorized')
        const newPost = { userId, content, isPublic }
        const createNewPost = await createPostDB(newPost)
        res.status(201).send({
            message: 'Create success',
            post: createNewPost,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getAllPost = async (req, res) => {
    const { pageSize, pageNumber } = req.query
    try {
        const totalItems = await countPost()
        const totalPage = Math.ceil(totalItems / pageSize)
        const skip = (pageNumber - 1) * pageSize
        const listPost = await findAllPost({}, skip, pageSize)
        res.status(200).send({
            totalItems,
            totalPage,
            currentPage: +pageNumber,
            items: listPost,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getPost = async (req, res) => {
    const { postId } = req.params
    try {
        let postResult = await findPostById(postId)
            .populate('userId')
        res.status(200).send({
            postResult
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}