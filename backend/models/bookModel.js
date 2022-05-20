const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        blurb: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        pic: {
            type: String,
            required: true,
            default:
                "https://ichef.bbci.co.uk/images/ic/1200x675/p08j8hmv.jpg",
        },
    },
    {
        collection: "books"
    }
);

const Book = mongoose.model("Book", bookSchema)
module.exports = Book



// blurb: {
//     type: String,
//     required: true,
// },
// genre: {
//     type: String,
//     required: true,
// },
// datePublished: {
//     type: String,
//     required: true,
// },
// pic: {
//     type: String,
//     required: true,
//     default:
//         "https://ichef.bbci.co.uk/images/ic/1200x675/p08j8hmv.jpg",
// },
