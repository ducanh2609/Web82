import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { login, register } from './controllers/users.controllers.js'
import authMiddleware from './middlewares/auth.middlewares.js'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import commentRouter from './routes/comments.routes.js'

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
app.use('/comments', commentRouter)


//test github

app.listen(process.env.PORT_DEVELOP, () => {
    console.log('server is running!');
})