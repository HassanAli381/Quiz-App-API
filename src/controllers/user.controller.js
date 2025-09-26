const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('./../models/user.model');
const AppError = require('../utils/AppError');
const { SUCCESS, FAIL } = require('./../utils/responseStatus');
const generateJWT = require('../utils/generateJWT');

const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const error = new AppError(FAIL, 400, 'User already exists!')
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
        status: SUCCESS,
        msg: '🆕 New user signed up!',
        requestedAt: req.requestedAt,
        data: newUser
    });

});

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user || !(await user.comparePasswords(password))) {
        const error = new AppError(FAIL, 401, 'invalid email or password')
        return next(error);
    }

    user.lastLogin = new Date();
    await user.save();

    const token = await generateJWT({
        id: user._id,
        email,
        role: user.role
    });
    res.cookie('token', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true, 
        secure: (process.env.NODE_ENV === 'production')
    });

    res.status(201).json({
        status: SUCCESS,
        msg: '✅User logged in successfully!',
        requestedAt: req.requestedAt,
        data: {
            token
        }
    });
});


const authByGoogle = asyncHandler(async (req, res, next) => {
    const user = req.user ;
    if(!user) {
        const error = new AppError(FAIL, 401, 'Authentication failed!');
        return next(error);
    }

    const token = await generateJWT({
        id: user._id,
        email: user.email,
        role: user.role
    });

    res.cookie('token', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true, 
        secure: (process.env.NODE_ENV === 'production')
    });


    res.status(201).json({
        status: SUCCESS,
        msg: '✅User logged in with google successfully!',
        requestedAt: req.requestedAt,
        data: {
            token
        }
        
    });
});

module.exports = {
    register,
    login,
    authByGoogle
}