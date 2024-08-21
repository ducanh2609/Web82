import { getOneUser } from "../../lesson7/models/users.models.js";
import { getUserById } from "../models/users.models.js";

const authMiddleware = {
    authentication: async (req, res, next) => {
        const { userId } = req.query
        try {
            const isAuthenticated = await getUserById(userId)
            if (isAuthenticated) {
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
        const { username } = req.params // sẽ lấy trong token ở bài 8
        try {
            const findUser = await getOneUser({ username })
            if (!findUser) throw new Error('Username is not exist')
            const checkRoleAdmin = findUser.role.includes('admin') // Vai trò của người dùng (ví dụ: admin hoặc user)
            console.log(checkRoleAdmin);

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