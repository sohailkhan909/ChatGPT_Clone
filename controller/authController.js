const userModel = require('../models/userModel');
const errorResponse = require('../utills/errorResponse');

exports.sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token
    })
}


exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await userModel.findOne({ email });

        if (existingEmail) {
            return next(new errorResponse('Email is already register', 500))
        }

        const user = await userModel.create({ username, email, password })
        this.sendToken(user, 201, res)

    } catch (error) {
        console.log(error);
        next(error)

    }
}
exports.loginController = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorResponse('Please provide email or password', 400))
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return next(new errorResponse('User Invalid', 401))
        }
        const isMatch = await userModel.matchPassword(password);

        if (!isMatch) {
            return next(new errorResponse('Invalid Credentail', 401))
        }

        this.sendToken(user, 200, res)

    } catch (error) {
        console.log(error);
        next(error)

    }

}
exports.logoutController = async (req, res, next) => {

    try {
        res.clearCookie('refreshToken');
        return res.status(200).json({
            success: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

