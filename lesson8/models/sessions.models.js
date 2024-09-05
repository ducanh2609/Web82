import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/collections.js";

const sessionSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    key: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})



const SessionModel = new mongoose.model(COLLECTIONS.SESSION, sessionSchema)


export const createSession = (data) => {
    return SessionModel.create(data)
}

export const getSession = (data) => {
    return SessionModel.findOne(data)
}


export default SessionModel 