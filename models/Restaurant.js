import mongoose from "mongoose";

// const feedbackSchema = new mongoose.Schema(
//     {
//         orderId: {type: String},
//         rating: {type: Number},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
//         comment: {type: String}
//     }
// );

// const FeedbackModel = mongoose.model("Restaurants", feedbackSchema);

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        rating: {
            type: Object,
            required: true,
            default: {
                value: 0,
                numberOfRating: 0,
            },
        },
        sales: { type: Number, require: true },
        location: {
            type: { type: String, enum: ["Point"], required: true },
            coordinates: { type: [Number], required: true },
        },
    },
    { timestamps: true }
);

schema.index({ location: "2dsphere" });

export const RestaurantModel = mongoose.model("Restaurants", schema);



export const findRestaurantById = async (restaurantId) => {

    const restaurant = await RestaurantModel.findById(restaurantId)
    return restaurant
}

export const addRestaurantRating = async (restaurantId, rating) => {
    try {
        const restaurant = await RestaurantModel.findById(restaurantId);

        const oldNumberOfRatings = restaurant.rating.numberOfRating;


        const newRatingValue = parseFloat(rating);
        const updatedValue =
            (parseFloat(restaurant.rating.value) * oldNumberOfRatings +
                newRatingValue) /
            (oldNumberOfRatings + 1);

        restaurant.rating.value = updatedValue.toFixed(1);
        restaurant.rating.numberOfRating += 1;

     
        const restaurantUpdated = new RestaurantModel(restaurant);
        const a = await restaurantUpdated.save()
        return a;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};

export const addRestaurant = async (restaurant) => {
    const newRestaurant = new RestaurantModel(restaurant);

    const savedRestaurant = await newRestaurant.save();

    return savedRestaurant;
};

export const findOneRestaurant = async (id) => {
    const restaurant = await RestaurantModel.findOne({
        id,
    });

    return restaurant;
};

export const findNearbyRestaurants = async (userLng, userLat) => {
    try {
        const nearbyRestaurants = await RestaurantModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [parseFloat(userLng), parseFloat(userLat)],
                    },
                    distanceField: "distance",
                    maxDistance: 15000,
                    spherical: true,
                },
            },
        ]);

        return nearbyRestaurants;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const findTopSellingRestaurants = async (userLng, userLat) => {
    try {
        const restaurants = await RestaurantModel.find({})
            .sort({ sales: -1 })
            .limit(2);

        return restaurants;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const findHighestRatedRestaurants = async (userLng, userLat) => {
    try {
        const restaurants = await RestaurantModel.find({})
            .sort({ rating: -1 })
            .limit(2);

        return restaurants;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const addRestaurantFeedBack = async () => {
    try {
    } catch (error) {}
};
