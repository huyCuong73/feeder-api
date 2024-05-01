import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        address: { type: String },
        phoneNumber: {type: String},
        name: {type: String},
        feedback: {type:[]},
        picture: {type: String},
        
    },
    { timestamps: true }
);

export const ShipperModel = mongoose.model("Shippers", schema);
