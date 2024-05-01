import mongoose from "mongoose";

// const feedbackSchema = new mongoose.Schema(
//     {
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
//         rating: {type:Number, required: true},
//         comment: {type: String}
//     }
// )

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        feedback: { type: [], required: true },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
        },
    },
    { timestamps: true }
);

export const FoodModel = mongoose.model("Foods", schema);

export const addFeedback = async (foodId, userId, rating, comment,createdAt) => {
    try {
        const updatedDocument = await FoodModel.findByIdAndUpdate(
            foodId,
            {
                $push: {
                    feedback: {
                        userId,
                        rating,
                        comment,
                        createdAt,
                    },
                },
            },
            { new: true }
        );

   
        return updatedDocument;
    } catch (error) {
        console.log("add feedback err", error);
    }
};

export const addFood = async (food) => {
    const newFood = new FoodModel(food);
    const savedFood = await newFood.save();

    return savedFood;
};

export const findOneFood = async (id) => {
    const food = await FoodModel.find({
        id,
    });

    return food;
};

export const findFoodsByRestaurant = async (restaurantId) => {
    const foods = await FoodModel.find({ restaurantId })
                                  .populate({
                                      path: 'feedback.userId',
                                      model: 'Users'
                                  });

    return foods;
};
export const findTenHighestRatedFoods = async () => {
    Model.find({})
        .sort({ rating: -1 })
        .limit(10)
        .exec((err, documents) => {
            if (err) {
                console.error(err);
            } else {
                return documents;
            }
        });
};
