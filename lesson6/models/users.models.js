import mongoose from "mongoose"
import { COLLECTIONS } from "../utils/collections.js"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const UserModel = new mongoose.model(COLLECTIONS.USERS, userSchema)

export const getUserDB = (data) => {
    return UserModel.find(data)
}

export const getUserById = (id) => {
    return UserModel.findById(id)
}

export const createUserDB = (data) => {
    return UserModel.create(data)
}



export default UserModel