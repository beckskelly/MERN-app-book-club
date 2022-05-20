const express = require('express')
const { 
    getMyBooks, 
    createBook, 
    getMyBookById, 
    updateBook,
    deleteBook,
    createFavs
} = require('../controllers/myBookController')
const { protect } = require("../middlewares/authMiddleware")


const router = express.Router()

router.route('/').get(protect, getMyBooks)
router.route('/create').post(protect, createBook)
router.route('/:id').get(getMyBookById).put(protect, updateBook).delete(protect, deleteBook)


module.exports = router