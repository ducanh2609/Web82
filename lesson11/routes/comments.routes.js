import { Router } from "express"
import { createComment, getAllComment } from "../controllers/comments.controllers.js"
const commentRouter = Router()

commentRouter.post('/', createComment)
commentRouter.get('/', getAllComment)


export default commentRouter