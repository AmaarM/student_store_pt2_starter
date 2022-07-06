const express = require("express");
const router = express.Router();
const Store = require("../models/store");

router.get("/", async (req,res,next) => {
    try {
        const getProducts = await Store.listProducts();
        return res.status(200).json({products:getProducts})
    }
    catch(err){
        console.log(err);
    }
})



module.exports = router;