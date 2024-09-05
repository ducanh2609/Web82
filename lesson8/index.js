import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { login, register } from './controllers/users.controllers.js'
import authMiddleware from '../lesson8/middlewares/auth.middlewares.js'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
dotenv.config()

const app = express()
app.use(express.json())
await mongoose.connect(process.env.MONGO_DB)
console.log('database connected')
app.post('/register', register)
app.post('/login', login)
// app.use(authMiddleware.authentication)
app.use('/users', userRouter)
app.use('/posts', postRouter)

// app.get('/users/:username', authMiddleware.authentication, authMiddleware.auhthorizationAdmin, async (req, res) => {
//     console.log('avcvxv', req.isAdmin)
//     const { username } = req.params
//     try {
//         const findUser = await getUser(req.isAdmin ? {} : { username })
//         res.send({
//             listUser: findUser
//         })
//     } catch (error) {
//         res.send({
//             message: error.message
//         })
//     }
// })



app.listen(process.env.PORT_DEVELOP, () => {
    console.log('server is running!');
})