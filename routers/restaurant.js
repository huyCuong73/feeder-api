import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { RestaurantModel, addRestaurant, addRestaurantRating, findHighestRatedRestaurants, findNearbyRestaurants, findRestaurantById, findTopSellingRestaurants } from "../models/Restaurant.js";

dotenv.config();


router.post("/get-restaurant-info", async (req,res) => {
    const restaurant = await findRestaurantById(req.body.restaurantId)
    return res.status(200).json(restaurant)
})

router.post("/find-nearest-restaurants", async (req, res) => {

    const nearbyRestaurants = await findNearbyRestaurants(req.body.longitude, req.body.latitude);
    return res.status(200).json(nearbyRestaurants);
}) 

router.get("/find-top-selling-restaurants", async (req, res) => {

    const nearbyRestaurants = await findTopSellingRestaurants();
    return res.status(200).json(nearbyRestaurants);
}) 

router.get("/find-highest-rated-restaurants", async (req, res) => {

    const nearbyRestaurants = await findHighestRatedRestaurants();
    return res.status(200).json(nearbyRestaurants);
}) 


router.post("/add-restaurant", async (req, res) => {

    const newRestaurant = await addRestaurant(req.body)
    return res.status(200).json(newRestaurant)

}) 

router.post("/add-restaurant-rating", async (req, res) => {
    try {
        
        const restaurantUpdated = await addRestaurantRating(req.body.restaurantId, req.body.rating)
       return  res.status(200).json(restaurantUpdated)
    } catch (error) {
        console.log(error);
    }
})

router.get("/modify", async (req, res) => {
    const restaurants = await RestaurantModel.find()

    restaurants.forEach(restaurant => {
        restaurant.rating = {
            value:0,
            numberOfRating:0
        }
        restaurant.save()
    })
    
})



export default router