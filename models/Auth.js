import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String}
}, {timestamps: true})

export const AuthModel = mongoose.model('Auths', schema) 