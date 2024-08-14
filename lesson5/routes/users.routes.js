import { Router } from "express"
import { createUser } from "../controllers/users.controllers.js"
const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send('Users')
})

userRouter.post('/', createUser)


export default userRouter