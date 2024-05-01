import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { addNotification, findNotification } from "../models/Notification.js";
dotenv.config();

router.post('/add-notification', async(req,res) => {
    try {

        const newNotif = await addNotification(req.body.notification)
        return res.status(200).json(newNotif)
    } catch (error) {
        console.log(error);
    }
})


router.post('/find-notification', async(req,res) => {
    try {

        const notifs = await findNotification(req.body.userId)
        return res.status(200).json(notifs)
    } catch (error) {
        console.log(error);
    }
})



export default router