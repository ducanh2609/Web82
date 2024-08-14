import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collection.js";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
})

const UserModel = mongoose.model(COLLECTIONS.USERS, userSchema)

export default UserModel