const Question = require("../models/question.model");
const { shuffleArray }  = require("../utils/helperFunctions");
const { SUCCESS, FAIL } = require("../utils/responseStatus");
const mongoose = require("mongoose")

// getallquestion , getcatbyid , createquestion , updatecat , deletecat
const getQuestions = async (req, res) => {
    // if no query send --> get all questions
    if (Object.keys(req.query).length === 0)
        return getAllQuestions(req, res);
    else
        return getSomeQuestions(req, res);
}
const getAllQuestions = async (req, res) => {
    const allQuestions = await Question.find({});
    if (allQuestions.length === 0) {
        res.status(200).json({
            status: SUCCESS,
            msg: "No Data Found"
        })
        return;
    }
    res.status(200).json({
        status: SUCCESS,
        length: allQuestions.length,
        msg: "all questions retrived",
        data: allQuestions
    });
};

const getSomeQuestions = async (req, res) => {
    const filter = {};
    if (req.query.catId) {
        if (!mongoose.Types.ObjectId.isValid(req.query.catId)) {
            return res.status(400).json({
                status: "Fail",
                msg: "Invalid categoryId format",
            });
        }
        filter.categoryId = req.query.catId
    }
    if (req.query.difficulty)
        filter.difficulty = req.query.difficulty;
    const retrivedquestions = await Question.find(filter)
    if (retrivedquestions.length === 0) {
        return res.status(200).json({
            status: SUCCESS,
            msg: "No Data Found for given filters"
        });
    }

    // suffule questions to return random each time
    let randomizedQuestions = shuffleArray(retrivedquestions);
    const nQuestions = req.query.nQuestions;
    if (nQuestions && !isNaN(nQuestions))
        randomizedQuestions = randomizedQuestions.slice(0, req.query.nQuestions);

    res.status(200).json({
        status: SUCCESS,
        msg: "Some Questions is retrived",
        data: {
            results: randomizedQuestions.length,
            randomizedQuestions
        }
    });
}


const getRandomQuestions = async (difficulty, nQuestions, catId) => {
    const filter = {};
    if (catId)
        filter.categoryId = catId
    if (difficulty)
        filter.difficulty = difficulty;
    const retrivedquestions = await Question.find(filter)
    if (retrivedquestions.length === 0) {
        return {};
    }
    let randomizedQuestions = shuffleArray(retrivedquestions);
    if (nQuestions && !isNaN(nQuestions))
        randomizedQuestions = randomizedQuestions.slice(0, nQuestions);
    
    return randomizedQuestions;
}

const getQuestionbyId = async (req, res) => {
    const question = await Question.findById(req.validId);
    if (!question) {
        res.status(400).json({
            status: FAIL,
            msg: "No Such ID"
        })
        return;
    }
    res.status(200).json({
        status: SUCCESS,
        msg: "Question retrived",
        data: question,
    });
};

const createQuestion = async (req, res) => {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({
        status: SUCCESS,
        msg: "New Question is added",
        data: newQuestion
    })
};

const updateQuestion = async (req, res) => {
    const updatedQuestion = await Question.findById(req.validId);
    if (!updatedQuestion) {
        res.status(200).json({
            status: FAIL,
            msg: "No such ID"
        })
        return;
    }
    Object.assign(updatedQuestion, req.body);
    await updatedQuestion.save();
    res.status(200).json({
        status: SUCCESS,
        msg: "Question updated!",
        data: updatedQuestion
    })
};

const deleteQuestion = async (req, res) => {
    const delObj = await Question.findByIdAndDelete(req.validId);
    if (!delObj) {
        res.status(400).json({
            status: FAIL,
            msg: "No such ID"
        })
        return;
    }
    res.status(204).json({
        status: SUCCESS,
        msg: "Question Deleted!",
        data: delObj
    })
};

module.exports = {
    getQuestions,
    getQuestionbyId,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getSomeQuestions,
    getRandomQuestions
}