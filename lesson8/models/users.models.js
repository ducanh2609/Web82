import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

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
    role: {
        type: [String],
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

const UserModel = new mongoose.model(COLLECTIONS.USERS, userSchema)

export const getUser = (data) => {
    return UserModel.find(data)
}
export const getOneUser = (data) => {
    return UserModel.findOne(data)
}
export const getUserById = (id) => {
    console.log(id);

    return UserModel.findById(id)
}

export const createUser = (data) => {
    return UserModel.create(data)
}


export default UserModel