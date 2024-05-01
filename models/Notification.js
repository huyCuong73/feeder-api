import mongoose from "mongoose";

const schema = new mongoose.Schema({
    content: {type: String, },
    userId: {type: String, },
    restaurantId: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurants"},
    orderId: {type: mongoose.Schema.Types.ObjectId, ref: "Orders"}
}, {timestamps: true})

export const NotificationModel = mongoose.model('Notifications', schema) 

export const addNotification = async (notification) => {
    const newNotif = new NotificationModel(notification)

    const savedNotif = await newNotif.save()
    return savedNotif
}

export const findNotification = async (userId) => {
    const notifs = await NotificationModel.find({
        userId: userId
    }). populate("restaurantId")
    return notifs
}