import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { createTicket, findAllTicketByUserId } from "../models/Ticket.js";


dotenv.config();



router.post("/create-new-ticket", async (req, res) => {
    try {

        const newTicket = await createTicket(req.body)

        return res.status(200).json(newTicket)
        
    } catch (error) {
        console.log(error);
    }

}) 

router.post("/add-user-using-voucher", async (req, res) => {
    try {

        const voucherUpdated = await addUserUsingVoucher(req.body.voucherId, req.body.userId)
    
        return res.status(200).json(voucherUpdated)
        
    } catch (error) {
        console.log(error);        
    }

})

router.post("/get-user-tickets", async (req, res) => {
    try {
        
        const tickets = await findAllTicketByUserId(req.body.userId)
    
        return res.status(200).json(tickets)
        
    } catch (error) {
        console.log(error);        
    }

})

export default router