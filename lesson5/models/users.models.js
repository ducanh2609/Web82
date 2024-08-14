import UserModel from "../schemas/users.schemas.js"


export const getAllUser = () => {
    return UserModel.find()
}

export const getUserById = (userId) => {
    return UserModel.findById(userId)
}

export const createUserDB = (data) => {
    return UserModel.create(data)
}
