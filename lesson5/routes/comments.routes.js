import { Router } from "express"
const commentRouter = Router()

commentRouter.get('/', (req, res) => {
    res.send('Users')
})


export default commentRouter