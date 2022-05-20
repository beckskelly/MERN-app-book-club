const Book = require("../models/bookModel")
const asyncHandler = require("express-async-handler")


const makeBook = async(req, res) => {
    const { title, author, blurb, genre, datePublished } = req.body
    res.json({ title, author})
}

const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find()
    if (books) {
    res.json(books)
    } else {
    res.status(400)
    throw new Error('No books.')
    }
})

const queryBooks = asyncHandler(async (req, res, next) => {
    let query;

    let uiValues = {
        filtering: {},
        sorting: {}
    }

    const reqQuery = { ...req.query }
    const removeFields = ["sort"]
    removeFields.forEach((val) => delete reqQuery[val]);

    const filterKeys = Object.keys(reqQuery)
    const filterValues = Object.values(reqQuery)

    filterKeys.forEach((val, idx) => uiValues.filtering[val] = filterValues[idx])


    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = Book.find(JSON.parse(queryStr));
    
    if(req.query.sort) {
        const sortByArr = req.query.sort.split(',')

        sortByArr.forEach(val => {
            let order;

            if(val[0] === '-') {
                order = "descending"
            } else {
                order = "ascending"
            }
            uiValues.sorting[value.replace("-", "")] = order
        })
        const sortByStr = sortByArr.join(' ')
        query = query.sort(sortByStr)
    } else {
        query = query.sort('-price')
    }

    const books = await query

    const maxPrice = await Book.find().sort({ price: -1}).limit(1).select("-_id price")

    uiValues.maxPrice = maxPrice[0].price;

    res.status(200).json({
        success: true,
        data: books,
        uiValues,
    })
})

const getBook = asyncHandler(async (req, res) => {
    const book = await Book.findOne({ _id: req.params._id })
    if (book) {
    res.json(book)
    } else {
    res.status(400)
    throw new Error('No book exists with that Title.')
    }
})

module.exports = { getBooks, getBook, queryBooks }

