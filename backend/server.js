const express = require("express");
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const myBookRoutes = require('./routes/myBookRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");


const cors=require("cors");// get rid
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}



// no destructuring for default imports
const app = express()
dotenv.config()
connectDB()

app.use(express.json())// must be done every time json data is accepted from the user

app.get('/', (req,res) => {
    res.send("API is running...")
})

app.use('/api/users', userRoutes)
app.use('/api/mybooks', myBookRoutes)

app.use('/api/books', bookRoutes)

app.use(notFound)
app.use(errorHandler)


app.use(cors(corsOptions)) // get rid




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening on PORT $`))
