import express from 'express'
import mongoose from 'mongoose'
import { DATABASE_PASSWORD, DATABASE_USERNAME, PORT_DEVELOP } from './utils/constant.js'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import authMiddleware from './middlewares/auth.middlewares.js'

const app = express()

await mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@test.dknwp.mongodb.net/test`)
console.log('database connected')

app.use(express.json())
// app.post('/register', register)
app.use(authMiddleware.authentication)

app.use('/users', userRouter)
app.use('/posts', postRouter)


app.listen(PORT_DEVELOP, () => {
    console.log('server is running!');

})