import { Router } from 'express'
import { createPost, getPost, getAllPost } from '../controllers/posts.controllers.js'

const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/', getAllPost)
postRouter.get('/:postId', getPost)




export default postRouter