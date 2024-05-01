import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { OrderModel, addOrder, changeRatedStatus, findAllOrders, findAndConfirmOrder, findOrdersByUserId, finishOrder, getOneOrder } from "../models/Order.js";
dotenv.config();

router.post("/change-rated-status", async(req,res) => {
    try {
        console.log(req.body);
        const order = await changeRatedStatus(req.body.orderId)

        return res.status(200).json(order)
    } catch (error) {
        return res.json(error)
    }   
})

router.post("/confirm-order", async(req,res) => {
    try {
        const orders = await findAndConfirmOrder(req.body.orderId, req.body.time, req.body.shipperId)

        return res.status(200).json(orders)
    } catch (error) {
        return res.json(error)
    }   
})

router.post("/add-order", async (req, res) => {

    const newOrder = await addOrder(req.body)
    return res.status(200).json(newOrder)
}) 


router.post("/finish-order", async (req, res) => {

    const newOrder = await finishOrder(req.body.orderId, req.body.time)
    return res.status(200).json(newOrder)
}) 



router.post("/get-orders-by-user-id", async (req, res) => {
    try {
        const orders = await findOrdersByUserId(req.body.userId)
        return res.status(200).json(orders)
    } catch (error) {
        return res.json(error)
    }
})

router.post("/find-one-order", async(req, res) => {

    const order = await getOneOrder(req.body.orderId)

    return res.status(200).json(order)
})


router.get("/find-all-orders", async(req, res) => {
    const all = await findAllOrders()
    return res.status(200).json(all)
})


router.get("/modify", async (req, res) => {
    const orders = await OrderModel.find()

    orders.forEach(order => {
        order.rated = false
        order.save()
    })
    
})

export default router