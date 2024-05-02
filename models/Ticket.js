import mongoose from "mongoose";

const schema = new mongoose.Schema({
    type: {type: String, required: true,},
    orderId: {type: String, required: true},
    header: {type: String, required: true},
    body: {type: String, required: true},
    userId: {type: String, required: true},
    response: {type: String, default: ""}
}, {timestamps: true})

export const TicketModel = mongoose.model('Tickets', schema) 


export const createTicket = async (ticket) => {
    try {
  
        const newTicket = new TicketModel(ticket)
        const savedTicket = await newTicket.save()

        return savedTicket
    } catch (error) {
        console.log(error)
    }
}

export const getAllTicket = async (ticket) => {
    try {
  
        const tickets = await TicketModel.find()
        return tickets
    } catch (error) {
        console.log(error)
    }
}

export const updateTicketStatus = async (ticketId) => {
    try {
        const updatedTicket = await TicketModel.findByIdAndUpdate(
            ticketId,{
                $set:{
                    status: "solved"
                }
            }
        )

        return updatedTicket
    } catch (error) {
        console.log(error)
    }
}


export const createTicketResponse = async (ticketId, response) => {
    try {
        const updatedTicket = await TicketModel.findByIdAndUpdate(
            ticketId,{
                $set:{
                    response: response
                }
            }, {new: true}
        )

        return updatedTicket
    } catch (error) {
        console.log(error)
    }
}

export const findAllTicketByUserId = async (userId) => {
    try {
        const tickets = await TicketModel.find({userId})

        return tickets
    } catch (error) {
        console.log(error)
    }
}