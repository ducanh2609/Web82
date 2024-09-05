import { Router } from 'express'
import { createPost, getPost } from '../controllers/posts.controllers.js'
import authMiddleware from '../middlewares/auth.middlewares.js'

const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/:postId', getPost)



export default postRouter