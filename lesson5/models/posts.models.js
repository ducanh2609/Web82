import PostModel from "../schemas/posts.schemas.js"


export const createPostDB = (data) => {
    return PostModel.create(data)
}

export const findPostById = (id) => {
    return PostModel.findById(id)
}