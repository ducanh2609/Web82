import express from 'express'
import { v4 as uuidv4 } from 'uuid'
const PORT = 8080
const SERVER_API = 'http://localhost:3000'
const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    //có thông user : req.body
    const { userName, email, avatar } = req.body
    try {
        //Lấy list user
        const users = await fetch(`${SERVER_API}/users`)
        if (users) {
            const data = await users.json()
            console.log('users', data)

            //checkvalidate
            if (!userName) throw new Error('username is required!')
            //check email trùng
            const userEmail = data.find((item) => item.email === email)
            // Nếu trùng => lỗi
            if (userEmail) throw new Error('Email is exist')
            // tạo 1 id random
            const id = uuidv4()
            // Tạo user mới
            const newUser = { id, userName, email, avatar }
            data.push(newUser)
            res.status(201).send({
                data
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})


app.listen(PORT, (err) => {
    console.log(`Server is running http://localhost:${PORT}`)
})