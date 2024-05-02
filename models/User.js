import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        point: {type: Number, default: 0},
        address: { type: Array },
        phoneNumber: {type: String},
        username: { type: String, required: true },
        paymentMethod: { type: Object, default: {bank:[], visa: []} },
        pushToken: {type:String},
        favouriteRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' }],
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("Users", schema);

export const addPointsToUser = async (userId) => {
    try {

        const updatedDocument = await UserModel.findByIdAndUpdate(
            userId, 
            {
                $inc: {
                    point: 500
                }
            }, {new: true})
        return updatedDocument
    } catch (error) {
        console.log(error);
    }
}

export const removePointsFromUser = async (userId) => {
    try {
       
        const updatedDocument = await UserModel.findByIdAndUpdate(
            userId, 
            {
                $set: {
                    point: 0
                }
            }, {new: true})
        return updatedDocument
    } catch (error) {
        console.log(error);
    }
}

export const addFavouriteRestaurant = async (userId, restaurantId) => {
    try {
        const updatedDocument = await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    favouriteRestaurants: restaurantId,
                },
            },
            { new: true }
        );

        return updatedDocument;
    } catch (error) {
        console.log("addAddress err", error);
    }
}

export const removeFavouriteRestaurant = async (userId, restaurantId) => {
    try {

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { favouriteRestaurants: restaurantId } },
            { new: true }
          );
        return updatedUser;
    } catch (error) {
        console.log("addAddress err", error);
    }
};

export const addAddress = async (userId, address) => {
    try {

       
        const updatedDocument = await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    address: {addressNo: address.addressNo , place: address.place, type: address.type, phoneNumber: address.phoneNumber },
                },
            },
            { new: true }
        );

        return updatedDocument;
    } catch (error) {
        console.log("addAddress err", error);
    }
};



export const deleteAddress = async (userId, addressNo) => {
    try {

        const user =  UserModel.findByIdAndUpdate(
            userId,
            { $pull: { address: { addressNo: addressNo } } },
            { new: true }
        );

        return user;
    } catch (error) {
        console.log("addAddress err", error);
    }
};

export const updatePhoneNumberAddress = async (userId, addressNo, phoneNumber) => {
    try {

        const user =  UserModel.findOneAndUpdate(
            { _id: userId, 'address.addressNo': addressNo },
            { $set: { 'address.$.phoneNumber': phoneNumber } },
            { new: true }
          );

        return user;
    } catch (error) {
        console.log("addAddress err", error);
    }
};

export const addBankPayment = async (userId, paymentMethod) => {
    try {
        const updatedDocument = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { 'paymentMethod.bank': {
                name: paymentMethod.name,
                accountNumber: paymentMethod.accountNumber,
                otp: paymentMethod.otp
            } } },
            { new: true }
        );

        console.log(updatedDocument);

        return updatedDocument;
    } catch (error) {
        console.log("addAddress err", error);
    }
};

export const updatePushToken = async (userId, pushToken) => {
    try {
        const updatedUser = UserModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    pushToken,
                },
            },
            { new: true }
        )
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}
