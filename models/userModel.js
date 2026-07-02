const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookie = require('cookie')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [6, 'Password Length Should be 6 Character long']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true
    },
    customerId: {
        type: String,
        default: ''
    },
    subscription: {
        type: String,
        default: ''
    },

});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        // next()
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
    return;

})

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

cookie
userSchema.methods.getSignedToken = async function (res) {
    const accessToken = jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME })
    const refeshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIRY })

    res.cookie("refeshToken", {
        maxAge: 86400 * 7000,
        httpOnly: true
    })
}


const User = mongoose.model("User", userSchema)
module.exports = User;