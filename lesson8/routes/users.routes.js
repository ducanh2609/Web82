import { Router } from "express"
import authMiddleware from "../middlewares/auth.middlewares.js"
import { findOneUser, getAllUser } from "../controllers/users.controllers.js"
const userRouter = Router()


userRouter.get('/:userId', authMiddleware.auhthorizationAdmin, findOneUser)
userRouter.get('/', getAllUser)


export default userRouter