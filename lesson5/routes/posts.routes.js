import { Router } from "express"
import { createPost, editPost } from "../controllers/posts.controllers.js"
const postRouter = Router()

postRouter.get('/', (req, res) => {
    res.send('Users')
})

postRouter.post('/', createPost)

postRouter.put('/:postId', editPost)


export default postRouter