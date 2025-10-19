const Exam = require('../models/exam.model');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
// import { SUCCESS, FAIL } from '../utils/responseStatus';


const getUserbyId = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.validId).select('-password');;
    if (!user) {
        res.status(400).json({
            status: "FAIL",
            msg: "No Such User",
        });;
        return;
    }

    res.status(200).json({
        status: "SUCCESS",
        msg: "User Retrived",
        data: user,
    });

});


const getUserExams = asyncHandler(async (req, res) => {
    const userId = req.validId;
    console.log('userId', userId);
    const exams = await Exam.find({userId});

    res.status(200).json({
        status: "SUCCESS",
        msg: "User exams Retrived",
        data: exams,
    });
});


module.exports = {
    getUserbyId,
    getUserExams
};