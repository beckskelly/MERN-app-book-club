const Book = require("../models/bookModel")
const asyncHandler = require("express-async-handler")

const getMyBooks = asyncHandler(async (req, res) => {
    const myBooks = await Book.find({ user: req.user._id })
    res.json(myBooks)
})

const createBook = asyncHandler(async (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        res.status(400)
        throw new Error("please fill out all the fields")
    } else {
        const book = new Book({ user: req.user._id, title, author })

        const createdBook = await book.save()

        res.status(201).json(createdBook)
    }
})

const getMyBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (book) {
        res.json(book)
    } else {
        res.status(404).json({ message: "Book not found" })
    }
})

// get rid
const updateBook = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
  
    const book = await Book.findById(req.params.id);
  
    if (book.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (book) {
        book.title = title;
        book.author = author;
  
      const updatedBook= await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  });


const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
  
    if (book.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (book) {
      await book.remove();
      res.json({ message: "Book Removed" });
    } else {
      res.status(404);
      throw new Error("Book not Found");
    }
  });



module.exports = { getMyBooks, createBook, getMyBookById, updateBook, deleteBook }