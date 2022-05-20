const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// user has to pass through this middlware to reach the mybooks api
// protects our api from any unauthorized access
// 3 params
const protect = asyncHandler(async (req, res, next) => {
    //declare new variable called token
    let token;

    // checks headers to see if authorizition is present
    // checks to see if it has a token that starts with "Bearer", as we are sending our bearer token from the frontend
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //verifying token sent by user with l1 and l2
            // takes apart token by splitting it, it has "Bearer" and a token string inside it
            // removes bearer and takes token string
            // then decode by using jwt. verify
            token = req.headers.authorization.split(" ")[1];
            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password"); //leaves password
        
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized, not logged in")
    }
})

module.exports = { protect }