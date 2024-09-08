import { getOneUser, getUserById } from "../../lesson8/models/users.models.js";
// import { getSession } from "../models/sessions.models.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware = {
    authentication: async (req, res, next) => {
        let token = req.headers.authorization?.split(' ')[1] || ''
        console.log('token', token)

        try {
            if (!token) {
                throw new Error('Unauthorized')
            }
            const userInfor = jwt.verify(token, process.env.TOKEN_KEY)
            const findUser = await getUserById(userInfor.userId)
            //check key
            if (findUser) {
                req.userRole = findUser.role
                // Người dùng đã được xác thực, cho phép truy cập
                next();
            } else {
                throw new Error('Unauthorized'); // Trả về lỗi 401 nếu không được xác thực
            }
        } catch (error) {
            res.status(401).send({
                message: error.message
            })
        }
    },
    auhthorizationAdmin: async (req, res, next) => {
        const { userRole } = req // sẽ lấy trong token ở bài 8
        console.log('userRole', userRole)

        try {
            const checkRoleAdmin = userRole.includes('admin') // Vai trò của người dùng (ví dụ: admin hoặc user)

            if (checkRoleAdmin) {
                next()
            } else {
                throw new Error('Bạn k có quyền')
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
};
export default authMiddleware;