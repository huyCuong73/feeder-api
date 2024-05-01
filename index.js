import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routers/route.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import fs from "fs";
import os from "os";
import { fileURLToPath } from "url";
import path from "path";
import verifyAdmin from "./middleware/verifyAdmin.js";
import cron from "node-cron";
import { OrderModel } from "./models/Order.js";

dotenv.config();


// const currentTime = formatDate(new Date());
// console.log(currentTime);
// function formatDate(date) {
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();

//     return `${hours}:${minutes} ${day}-${month}-${year}`;
// }
cron.schedule("* * * * *", function () {
    const currentTime = formatDate(new Date());
    // console.log(currentTime);

    OrderModel.updateMany(
        { orderTime: currentTime },
        {
            $set: { type: "immediate" },
        }
    )
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

const app = express();
const PORT = process.env.PORT || 10000;

// const URI = 'mongodb://127.0.0.1:27017/chart'
const URI = process.env.URI;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());

route(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.resolve(__dirname, ".env");

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
    // !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({userId, socketId})
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return (onlineUsers = onlineUsers.find((user) => user.userId === userId));
};

console.log("online:", onlineUsers);

mongoose.set("strictQuery", true);

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // console.log('connected');
        const server = app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
        const io = new Server(server, {
            cors: {
                origin: "*",
            },
        });

        io.on("connection", (socket) => {
            socket.on("newUser", (userId) => {
                addNewUser(userId, socket.id);
                console.log("new user", onlineUsers);
            });

            socket.on("replyComment", (id) => {
                for (let i of onlineUsers) {
                    if ((i.userId = id)) {
                        socket.to(i.socketId).emit("replied", "dm");
                    }
                }
            });

            socket.on("orderAccepted", ({ userId, orderId }) => {
                
                console.log(userId, orderId);
                for (let i of onlineUsers) {
                    if ((i.userId = userId)) {
                        // console.log(id);
                        socket.to(i.socketId).emit("orderAcceptedByShipper", {userId, orderId});
                    }
                }
            });

            socket.on("orderCompleted", ({ userId, orderId }) => {
                
                console.log("orderCompleted", userId, orderId);
                for (let i of onlineUsers) {
                    if ((i.userId = userId)) {
                        // console.log(id);
                        socket.to(i.socketId).emit("orderCompletedByShipper", {userId, orderId});
                    }
                }
            });

            socket.on("disconnect", () => {
                removeUser(socket.id);
                console.log("remove user", onlineUsers);
            });
        });
    })
    .catch((err) => {
        console.log("err", err);
    });
