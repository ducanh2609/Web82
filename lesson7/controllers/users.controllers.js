import UserModel, { createUser, getUser } from "../models/users.models.js";
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    //lấy thông tin user
    const { username, password, email, role } = req.body
    try {
        let roleUser = role
        //check user tồn tại chưa
        const checkUser = await getUser({ username })
        console.log(checkUser)

        //nếu có rồi thì báo lỗi tk đã tồn tại
        if (checkUser.length) {
            throw new Error('username is exist')
        }
        //mã hóa mk
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt)
        //tạo tk và mk vào DB
        if (!role) {
            roleUser = ['users']
        }
        const newUser = { username, email, role: roleUser, password: hashPassword }
        const createNewUser = await createUser(newUser)
        //trả ra kq
        res.status(200).send({
            message: 'Created',
            user: createNewUser,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const login = (req, res) => {
    //lấy thông tin user
    try {
        // ktra username có đúng k
        // k đúng báo lỗi tài khoản k tồn tại
        // ktra mk xem đúng k
        const checkPassword = bcrypt.compareSync(password, 'mk DB')
        // k đúng báo ra lỗi sai mk
        // Báo ok
        const apiKey = `web-${req.body.userId}$-${req.body.email}-${randomString}$`
        res.status(200).send({
            message: 'Login success',
            apiKey,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}