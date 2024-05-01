import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { FoodModel, addFeedback, addFood, findFoodsByRestaurant } from "../models/Food.js";
dotenv.config();


router.post("/add-food", async (req, res) => {
    const newFood = await addFood(req.body)
    return res.status(200).json(newFood)

}) 


router.post("/find-foods-by-restaurant", async (req, res) => {

    // console.log(req.body);
    const foods = await findFoodsByRestaurant(req.body.restaurantId)
    // console.log(foods);
    return res.status(200).json(foods)
})

router.post("/get-one-food", async (req,res) => {
    try {
        const food = await FoodModel.findById(req.body.foodId)
        return res.status(200).json(food)
    } catch (error) {
        console.log(error);
    }
})

router.post("/add-food-feedback", async (req, res) => {
    try {
        req.body.foodsChecked.forEach(foodId => {
            addFeedback(foodId, req.body.userId, req.body.rating, req.body.comment, req.body.createdAt)
        })
    } catch (error) {
        console.log(error);
    }
})

export default router