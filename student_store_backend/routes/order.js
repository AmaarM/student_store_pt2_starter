const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { requireAuthenticatedUser } = require("../middleware/security");
const User = require("../models/user");


router.get("/me", requireAuthenticatedUser, (req,res,next) => {
    try{
        const user = res.locals;
        const email = User.fetchUserByEmail(user);
        const getOrders = Order.listOrdersForUser(email);
        return res.status(200).json({ orders: getOrders, user: user })
    }
    catch(err){
        console.log(err);
    }
})


router.post("/", requireAuthenticatedUser, (req,res,next) => {
    try{
        const user = res.locals;
        const createOrder = Order.createOrder(user, req.body)
        return res.status(200).json({ order: createOrder })
    }
    catch(err){
        console.log(err);
    }
})