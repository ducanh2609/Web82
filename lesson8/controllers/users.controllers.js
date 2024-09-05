import { createUser, getUser, getUserById } from "../models/users.models.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
// import { v4 as uuidv4 } from 'uuid'
// import { createSession, getSession } from "../models/sessions.models.js";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    //lấy thông tin user
    const { username, password, email, role } = req.body
    try {
        let roleUser = role
        //check user tồn tại chưa
        const checkUser = await getUser({ username })
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
        console.log(hashPassword);

        const newUser = { username, email, password: hashPassword, role: roleUser }

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

export const login = async (req, res) => {
    //lấy thông tin user
    const { username, password } = req.body
    try {
        // ktra username có đúng k
        const checkUser = await getUser({ username })
        // k đúng báo lỗi tài khoản k tồn tại
        if (!checkUser.length) {
            throw new Error('username not found')
        }
        // ktra mk xem đúng k
        const checkPassword = bcrypt.compareSync(password, checkUser[0].password)
        // k đúng báo ra lỗi sai mk
        if (!checkPassword) throw new Error('pass or username is incorrect')
        //check session
        // const checkSession = await getSession({ username })
        // const randomString = uuidv4().replaceAll('-', '')
        // const apiKey = `web-${checkUser[0]._id}-${checkUser[0].username}-${randomString}`
        // if (!checkSession) {
        //     //nếu chưa có
        //     const newSession = {
        //         username,
        //         key: randomString,
        //     }
        //     await createSession(newSession)
        // } else {
        //     //nếu có rồi
        //     checkSession.key = randomString
        //     checkSession.save()
        // }
        // Báo ok
        const userInfor = {
            userId: checkUser[0]._id,
            username: checkUser[0].username,
        }
        const token = jwt.sign(userInfor, process.env.TOKEN_KEY)
        console.log(token);

        res.status(200).send({
            message: 'Login success',
            token,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const findOneUser = async (req, res) => {
    const { userId } = req.params
    const { isAdmin, loginUserId } = req
    try {
        const findUser = await getUserById(userId)
        if (!findUser) throw Error('Not found')
        res.status(200).send({
            user: findUser,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const listUser = await getUser()
        res.status(200).send({
            listUser,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}