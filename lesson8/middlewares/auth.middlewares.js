import { getOneUser, getUserById } from "../../lesson8/models/users.models.js";
// import { getSession } from "../models/sessions.models.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { findOneUser } from "../controllers/users.controllers.js";
dotenv.config()

const authMiddleware = {
    authentication: async (req, res, next) => {
        // const { apiKey } = req.query
        // const [title, userId, username, randomString] = apiKey.split('-')
        let token = req.headers.authorization?.split(' ')[1] || ''
        try {
            if (!token) {
                throw new Error('Unauthorized')
            }
            const userInfor = jwt.verify(token, process.env.TOKEN_KEY)
            const isAuthenticated = await getUserById(userInfor.userId)
            //check trên session username có tồn tại k
            // const findSession = await getSession({ username })
            // if (findSession && randomString === findSession.key) {
            //     isAuthenticated = true
            // }
            //check key
            if (isAuthenticated) {
                req.loginUserId = userInfor.userId
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
        const { loginUserId } = req // sẽ lấy trong token ở bài 8
        console.log('userId', loginUserId)

        try {
            const findUser = await getUserById(loginUserId)
            if (!findUser) throw new Error('Username is not exist')
            const checkRoleAdmin = findUser.role.includes('admin') // Vai trò của người dùng (ví dụ: admin hoặc user)

            if (checkRoleAdmin) {
                req.isAdmin = true
            } else {
                req.isAdmin = false
            }
            next(); // Cho phép truy cập vào route
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
};
export default authMiddleware;