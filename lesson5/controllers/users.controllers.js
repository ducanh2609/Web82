import { createUserDB, getAllUser } from "../models/users.models.js"

export const createUser = async (req, res) => {
    //có thông user : req.body
    const { username, password, email } = req.body
    try {
        const users = await getAllUser()
        const checkEmail = users.find(item => item.email === email)
        if (checkEmail) throw new Error('Email is exist')
        const createUser = await createUserDB({
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
}