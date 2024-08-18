import { Router } from 'express'
import { createPost } from '../controllers/posts.controllers.js'
import authMiddleware from '../middlewares/auth.middlewares.js'

const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/', createPost)

postRouter.put('/:postId', createPost)

postRouter.delete('/', createPost)


export default postRouter