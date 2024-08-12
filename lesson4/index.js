import express from 'express'
import mongoose from 'mongoose'
import { DATABASE_PASSWORD, DATABASE_USERNAME, PORT_DEVELOP } from './utils/constants.js'
import UserModel from './models/users.models.js'
const app = express()
app.use(express.json())

await mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@test.dknwp.mongodb.net/test`)
console.log('database connected')

app.post('/users', async (req, res) => {
    //có thông user : req.body
    const { username, password, email } = req.body
    try {
        const users = await UserModel.find()
        const checkEmail = users.find(item => item.email === email)
        if (checkEmail) throw new Error('Email is exist')
        const createUser = await UserModel.create({
            username, password, email
        })
        res.status(201).send({
            user: createUser,
            message: 'Create success'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.listen(PORT_DEVELOP, (err) => {
    console.log(`Server is running http://localhost:${PORT_DEVELOP}`)
})