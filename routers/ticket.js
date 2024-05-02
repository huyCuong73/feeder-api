import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { createTicket, createTicketResponse, findAllTicketByUserId, getAllTicket } from "../models/Ticket.js";


dotenv.config();



router.post("/create-new-ticket", async (req, res) => {
    try {

        const newTicket = await createTicket(req.body)

        return res.status(200).json(newTicket)
        
    } catch (error) {
        console.log(error);
    }

}) 

router.post("/add-ticket-response", async (req, res) => {
    try {

   
        const updatedTicket = await createTicketResponse(req.body.ticketId, req.body.response)
   
        return res.status(200).json(updatedTicket)
        
    } catch (error) {
        console.log(error);
    }

}) 


router.get("/get-all-tickets", async (req, res) => {
    try {

        const tickets = await getAllTicket()
    
        return res.status(200).json(tickets)
        
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