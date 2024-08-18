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
    auhthorizationAdmin: (req, res, next) => {
        const userRole = 'admin'; // Vai trò của người dùng (ví dụ: admin hoặc user)
        if (userRole === 'admin') {
            next(); // Cho phép truy cập vào route
        } else {
            res.status(403).send('Forbidden'); // Trả về lỗi 403 nếu không có quyền truy cập
        }
    }
};
export default authMiddleware;