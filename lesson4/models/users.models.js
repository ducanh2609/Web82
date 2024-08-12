import mongoose from "mongoose";
import { collections } from "../utils/collection.js";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
})

const UserModel = mongoose.model(collections.USERS, userSchema)

export default UserModel

