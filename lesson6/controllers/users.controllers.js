import { createUserDB, getUserDB } from "../models/users.models.js"

export const createUser = async (req, res) => {
    const { username, password, email } = req.body
    try {
        //check user tồn tại chưa
        const user = await getUserDB({ username })
        // Nếu rồi => lỗi
        if (user) throw new Error('User is exist')
        // Validate field
        // Tạo user mới
        const newUser = { username, password, email }
        const createUser = await createUserDB(newUser)
        res.status(201).send({
            user: createUser
        })
        // Trả về kq
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await getUserDB()
    } catch (error) {

    }
}