//defines what type of data a user will have

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            // get rid
            type: Boolean,
            required: true,
            default: false,
        },
        pic: {
            type: String,
            required: true,
            default:
                "https://static.thenounproject.com/png/676465-200.png",
        },
        favourites: {
            type: Array,
            required: true,
            default:[]
        }
    },
    {
        collection: "users"
    }
);

// next = after this function is done it can move onto the next part of the operation
// A salt is a random string that makes the hash unpredictable
// encrypt password function
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// decrypt password function
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User