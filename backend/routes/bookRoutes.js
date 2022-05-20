const express = require('express')

const { getBooks, getBook,queryBooks } = require('../controllers/bookController')
const Book = require('../models/bookModel')
const router = express.Router()

router.route('/')
router.route('/books').get(getBooks)
router.route('/sort').get(queryBooks).get(getBooks)
router.route('/books/:title').get(getBook)


router.route('/:bookid').get(getBook)

router.route('/books_by_id')



module.exports = router