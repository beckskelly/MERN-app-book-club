const express = require('express')
const { 
    registerUser, 
    authUser, 
    createFavs, 
    updateUserProfile,
    getFavs,
    deleteProfile,
    getUser } = require('../controllers/userControllers')
const router = express.Router()
const { protect } = require("../middlewares/authMiddleware")

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile')
    .post(protect, updateUserProfile)
    .get(getUser)
    .delete(protect, deleteProfile)
router.route('/editprofile').post(protect, updateUserProfile)
router.route('/addfavourites')
    .patch(protect, createFavs)
    .get(protect, getFavs)





















module.exports = router