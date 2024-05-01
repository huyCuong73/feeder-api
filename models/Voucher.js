import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        discount: {type: Number,require: true},
        des: {type: String},
        amount: {type: Number, default: 100},
        usedBy: {type: Array, default: []},
    },
    { timestamps: true }
);

export const VoucherModel = mongoose.model("vouchers", schema);

export const getValidVouchersByUserId = async (userId) => {
    try {
        const validVouchers = await VoucherModel.find({
            usedBy: { $ne: userId }
        })

        return validVouchers
    } catch (error) {
        
    }
}

export const addUserUsingVoucher = async (voucherId, userId) => {
    try {
        const updatedVoucher = await VoucherModel.findByIdAndUpdate(voucherId,{   
            $push: {
                usedBy : userId
            }
        })

        return updatedVoucher
    } catch (error) {
        
    }
}