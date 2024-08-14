import express from 'express'
import mongoose from 'mongoose'
import { DATABASE_PASSWORD, DATABASE_USERNAME, PORT_DEVELOP } from '../lesson5/utils/constants.js'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import commentRouter from './routes/comments.routes.js'

const app = express()

await mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@test.dknwp.mongodb.net/test`)
console.log('database connected')
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello')
})
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)







app.listen(PORT_DEVELOP, () => {
    console.log(`Server is running http://localhost:${PORT_DEVELOP}`)
})


