const asyncHandler = require('express-async-handler') // will handle all of the errors in our application
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const jwt = require("jsonwebtoken")
const Book = require('../models/bookModel')


// when we request something from the user we use req/ request. when we provide something to the user we use res// response

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic} = req.body;

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }
        const user= await User.create({
            name, 
            email, 
            password, 
            pic,
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Error occured!')
        }

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('User not found. Invalid email or password.')
    }
})


const createFavs = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // get id
    const { title } = req.body//.title
    const alreadyInFavsCheck = await User.findOne({favourites:{$elemMatch:{title:title}}})
    if (alreadyInFavsCheck) {
        res.status(400)
        throw new Error('This book is already in your favourites')
    } else {
        user.favourites.push({  title })
        user.save()
        res.status(200)
        res.send("Book added to favourites")
        console.log("Book added to favourites")
        }
});


const getFavs = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // get id
    const favs = user.favourites
    console.log(favs)
    res.send(favs)
})



const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // get id
    await user.save()
  if (user) { //if user exists
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) { // if the body contains the password
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


const deleteProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        await user.remove();
        res.json({ message: "User deleted" });
    } else {
        res.status(404);
        throw new Error("User not Found");
      }
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  
    res.json(user);
  });





module.exports = { registerUser, authUser, createFavs, updateUserProfile, getFavs, deleteProfile, getUser }