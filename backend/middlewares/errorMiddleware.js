// not found errror. gives us original url and throws error

const notFound = (req, res, next) => {
    const error = new Error (`Not Found -  ${req.originalUrl}`)
    res.status(404)
    next(error)
}


// general errors, converts into a structured form
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

module.exports = { notFound, errorHandler }