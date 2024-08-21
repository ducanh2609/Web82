import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    passwword: {
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
    console.log(data)

    return UserModel.findOne(data)
}

export const createUser = (data) => {
    return UserModel.create(data)
}


export default UserModel