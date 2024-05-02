import express from "express";
const router = express.Router();
import { UserModel, addAddress, addBankPayment, addFavouriteRestaurant, addPointsToUser, deleteAddress, removeFavouriteRestaurant, removePointsFromUser, updatePhoneNumberAddress, updatePushToken } from "../models/User.js";
import jwt, { verify } from "jsonwebtoken";
import dotenv from "dotenv"
import verifyUser from "../middleware/verifyUser.js";
dotenv.config();



router.post("/add-favourite-restaurant", async (req,res) => {
    try {
    
        const user = await addFavouriteRestaurant(req.body.userId, req.body.restaurantId)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }  
})

router.post("/remove-favourite-restaurant", async (req,res) => {
    try {
       
        const user = await removeFavouriteRestaurant(req.body.userId, req.body.restaurantId)
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

        return res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.post("/delete-address", async (req, res) => {
    try {
        const updatedDocument = await deleteAddress(req.body.userId, req.body.addressNo)

        return res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.post("/update-phone-number-address", async (req, res) => {
    try {
        const updatedDocument = await updatePhoneNumberAddress(req.body.userId, req.body.addressNo, req.body.phoneNumber)

        return res.status(200).json(updatedDocument)
    } catch (error) {
        
    }
})

router.post("/add-bank-payment", async (req, res) => {
    try {
 
        const updatedDocument = await addBankPayment(req.body.userId, req.body.bankInfo)

        return res.status(200).json(updatedDocument)
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-user-point", async (req,res) => {
    try {
        const updatedUser = await addPointsToUser(req.body.userId)
        
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
    }
})

router.post("/remove-user-point", async (req,res) => {
    try {
        
        const updatedUser = await removePointsFromUser(req.body.userId)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
    }
})

router.get("/get-user",verifyUser, async(req,res) => {
    try {
        console.log("req",req.userId);
    } catch (error) {
        
    }
})






export default router;