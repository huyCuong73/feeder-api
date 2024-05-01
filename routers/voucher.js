import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { addUserUsingVoucher, getValidVouchersByUserId } from "../models/Voucher.js";

dotenv.config();


router.post("/get-valid-vouchers", async (req, res) => {
    try {
        
        const userId = req.body.userId
    
        const validVouchers = await getValidVouchersByUserId(userId)
        return res.status(200).json(validVouchers)
        
    } catch (error) {
        console.log(error);
    }

}) 

router.post("/add-user-using-voucher", async (req, res) => {
    try {

        console.log(req.body);
        const voucherUpdated = await addUserUsingVoucher(req.body.voucherId, req.body.userId)
    
        return res.status(200).json(voucherUpdated)
        
    } catch (error) {
        console.log(error);        
    }

})

export default router