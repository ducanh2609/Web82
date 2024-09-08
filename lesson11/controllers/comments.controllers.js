import { countComments, createCommentDB, findAllComment } from "../models/comments.models.js"
import { checkPayload } from "../utils/constants.js"

export const createComment = async (req, res) => {
    const { content } = req.body
    const { userId, postId } = req.query
    try {
        const newComment = {
            userId,
            postId,
            content,
        }
        const createNewComment = await createCommentDB(newComment)
        res.status(201).send({
            comment: createNewComment,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getAllComment = async (req, res) => {
    const { pageSize, pageNumber, postId, sort } = req.query
    try {
        const totalItems = await countComments()
        const totalPage = Math.ceil(totalItems / pageSize)
        const skip = (pageNumber - 1) * pageSize
        const sortNumber = sort === 'asc'
            ? 1 : sort === 'desc'
                ? -1 : 0
        const sortType = {
            _id: sortNumber
        }
        checkPayload(sortType)
        const listComments = await findAllComment({ postId }, skip, pageSize, sortType)
        res.status(200).send({
            totalItems,
            totalPage,
            currentPage: +pageNumber,
            items: listComments,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}