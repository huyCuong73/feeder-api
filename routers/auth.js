import express from "express";
const router = express.Router();
import { AuthModel } from "../models/Auth.js";
import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ShipperModel } from "../models/Shipper.js";
dotenv.config();

router.post("/register", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        const authInfo = new AuthModel({
            email,
            password,
        });

        const user = new UserModel({
            email,
            address: {},
            username,
        });

  

        const newAuthInfo = await authInfo.save();
        const newUser = await user.save();

        return res.status(200).json({
            email: newAuthInfo.email,
            username: newUser.username,
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json("Unauthorized");
    }
});

router.post("/shipper-register", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const authInfo = new AuthModel({
            email,
            password,
        });

        const user = new ShipperModel({
            email,
            address: "nhà 1A,212 Ng.92Đ Trần Phú,Mộ Lao,Hà Đông,Hà Nội",
            name,
        });



        const newAuthInfo = await authInfo.save();
        const newUser = await user.save();

        return res.status(200).json({
            email: newAuthInfo.email,
            name: newUser.name,
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json("Unauthorized");
    }
});


router.post("/login", async (req, res) => {
    try {
        console.log("logging in...");
        const email = req.body.email;
        const password = req.body.password;

        const userCre = await AuthModel.findOne({
            email: req.body.email,
        });
        
   
        if (userCre.password !== password) {
            return res.status(401).json("Bạn đã nhập sai mật khẩu");
        } else {

           
            if (userCre.type == "user") {
                const userInfo = await UserModel.findOne({
                    email: userCre.email,
                }).populate('favouriteFoods');

                jwt.sign(
                    { id: userInfo._doc._id, type: userCre.type },
                    "abcd",
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }

                        return res
                            .status(200)
                            .json({
                                user: { ...userInfo._doc },
                                accessToken: token,
                                type:"user"
                            });
                    }
                );
            }


            if (userCre.type == "shipper") {

           
                const shipperInfo = await ShipperModel.findOne({
                    email: userCre.email,
                });

        
                jwt.sign(
                    { id: shipperInfo._doc._id, type: userCre.type },
                    "abcd",
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                   
                        return res
                            .status(200)
                            .json({
                                user: { ...shipperInfo._doc },
                                accessToken: token,
                                type:"shipper"
                            });
                    }
                );
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json(err);
    }
});

export default router;
