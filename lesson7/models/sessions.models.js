import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const sessionSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    apiKey: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})