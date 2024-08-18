import { Router } from "express"
import { createUser } from "../controllers/users.controllers.js"
const userRouter = Router()

userRouter.post('/', createUser)


export default userRouter