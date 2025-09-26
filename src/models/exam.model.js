const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        required: [true, 'Exam difficulty is required'],
        enum: [
            "easy",
            "medium",
            "hard"
        ],
        default: "easy"
    },
    numberOfQuestions: {
        type: Number, 
        required: [true, 'Number of questions is required'],
        default: 10
    },
    time: { // time in ms
        type: Number, 
        default: 10 * 60 * 1000
    },
    grade: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required : [true, 'categoryId is required']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    },
    isGraded: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);