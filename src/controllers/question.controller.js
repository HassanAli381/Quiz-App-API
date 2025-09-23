const Question = require("../models/question.model");

// getallquestion , getcatbyid , createquestion , updatecat , deletecat
const getAllQuestions = async (req, res) => {
    const allQuestions = await Question.find({});
    if (allQuestions.length === 0) {
        res.status(200).json({
            status: "Success",
            msg: "No Data Found"
        })
        return;
    }
    res.status(200).json({
        status: "Success",
        msg: "all questions retrived",
        data: allQuestions
    });
};

const getQuestionbyId = async (req, res) => {
    const question = await Question.findById(req.validId);
    if (!question) {
        res.status(400).json({
            status: "Fail",
            msg: "No Such ID"
        })
        return;
    }
    res.status(200).json({
        status: "Success",
        msg: "Question retrived",
        data: question,
    });
};

const createQuestion = async (req, res) => {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({
        status: "Success",
        msg: "New Question is added",
        data: newQuestion
    })
};
// TODO:fix update bug
const updateQuestion = async (req, res) => {
    const updatedQuestion = await Question.findByIdAndUpdate(req.validId, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedQuestion) {
        res.status(200).json({
            status: "Fail",
            msg: "Faild to update question"
        })
        return;
    }
    res.status(200).json({
        status: "Success",
        msg: "Question updated!",
        data: updatedQuestion
    })
};

const deleteQuestion = async (req, res) => {
    const delObj = await Question.findByIdAndDelete(req.validId);
    if (!delObj) {
        res.status(400).json({
            status: "Fail",
            msg: "No such ID"
        })
        return;
    }
    res.status(200).json({
        status: "Success",
        msg: "Question Deleted!",
        data: delObj
    })
};

module.exports = {
    getAllQuestions,
    getQuestionbyId,
    createQuestion,
    updateQuestion,
    deleteQuestion
}