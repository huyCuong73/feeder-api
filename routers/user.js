import express from "express";
const router = express.Router();
import { UserModel, addAddress, addBankPayment, addFavouriteFood, deleteAddress, updatePhoneNumberAddress, updatePushToken } from "../models/User.js";
import jwt, { verify } from "jsonwebtoken";
import dotenv from "dotenv"
import verifyUser from "../middleware/verifyUser.js";
dotenv.config();



router.post("/add-favourite-food", async (req,res) => {
    try {
        console.log(req.body);
        const user = await addFavouriteFood(req.body.userId, req.body.foodId)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }  
})


router.post("/update-push-token", async(req,res) => {
    try {

        console.log(req.body);
        const updatedUser = await updatePushToken(req.body.userId, req.body.pushToken)
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-address", async (req, res) => {
    try {
        const updatedDocument = await addAddress(req.body.userId, req.body.address)

        res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.post("/delete-address", async (req, res) => {
    try {
        const updatedDocument = await deleteAddress(req.body.userId, req.body.addressNo)

        res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.post("/update-phone-number-address", async (req, res) => {
    try {
        const updatedDocument = await updatePhoneNumberAddress(req.body.userId, req.body.addressNo, req.body.phoneNumber)

        res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.post("/add-bank-payment", async (req, res) => {
    try {
 
        const updatedDocument = await addBankPayment(req.body.userId, req.body.bankInfo)

        res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.get("/get-user",verifyUser, async(req,res) => {
    try {
        console.log("req",req.userId);
    } catch (error) {
        
    }
})






export default router;