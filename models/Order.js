import mongoose from "mongoose";

const foodsOrdered = new mongoose.Schema({
    foodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods",
        require: true,
    },
    foodCount: {type: Number}

})

const schema = new mongoose.Schema(
    {
        type: {type: String, required: true},
        total: { type: Number, require: true },
        paidStatus: { type: Boolean, require: true },
        paymentMethod: { type: String, require: true },
        foods: [foodsOrdered],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Users",
        },
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants"},
        orderTime: { type: String, default: "" },
        orderConfirmedTime: { type: String, default: "" },
        receiveTime: { type: String, default: "" },
        orderTo: { type: String, require: true },
        voucher: { type: String, ref: "Vouchers" , default: ""},
        shipper: { type: mongoose.Schema.Types.ObjectId, ref: "Shippers" },
        rated: {type: Boolean, default: false},
        phoneNumber: {type: String, required: true}
    },
    { timestamps: true }
);



export const OrderModel = mongoose.model("Orders", schema);

export const changeRatedStatus = async (orderId) => {
    try {
        const newRatedStatus = await OrderModel.findByIdAndUpdate( orderId,{
            $set: {
                rated: true
            }
        }, { new: true } )

        // console.log(newRatedStatus);
        return changeRatedStatus
    } catch (error) {
        
    }
}

export const addOrder = async (order) => {
    try {
        const newOrder = new OrderModel(order);
        const newDocument = await newOrder.save();

        return newDocument;
    } catch (error) {
        console.log(error);
    }
};

export const findOrdersByUserId = async (userId) => {
    try {
        const orders = await OrderModel.find({
            userId,
        })
        .populate("foods.foodId")
        .populate('restaurantId')
        .exec();

        return orders;
    } catch (error) {
        console.log(error);
    }
};

export const findAllOrders = async () => {
    try {
        const orders = await OrderModel.find({}).populate('restaurantId');

        return orders;
    } catch (error) {
        console.log(error);
    }
};

export const findAndConfirmOrder = async (orderId, time, shipperId) => {
    try {
        console.log(time);
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            {
                orderConfirmedTime: time,
                shipper: shipperId,
            },
            { new: true }
        );

        return updatedOrder;
    } catch (error) {
        console.error("Error updating the order:", error);
        throw error;
    }
};

export const finishOrder = async (orderId, time) => {
    try {
        console.log(time);
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            {
                receiveTime: time,
                paidStatus: true,
            },
            { new: true }
        );

        return updatedOrder;
    } catch (error) {
        console.error("Error updating the order:", error);
        throw error;
    }
};

export const getOneOrder = async (orderId) => {
    try {
        const order = await OrderModel.findOne({
            _id: orderId,
        })
        .populate("foods.foodId")
        .populate('restaurantId')
        .exec();

        return order;
    } catch (error) {
        console.log(error);
    }
};
