const asyncHandler = require('express-async-handler');
const { SUCCESS } = require('./../utils/responseStatus');
const { getRandomQuestions } = require('./question.controller');
const Exam = require('./../models/exam.model');
const Question = require('./../models/question.model');

const getAllExams = asyncHandler(async (req, res, next) => {
    
    const exams = await Exam.find({});

    res.status(200).json({
        status: SUCCESS,
        results: exams.length,
        msg: "Exam retrived",
        data: exams,
    });
}); 

const getExam = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const exam = await Exam.findById(id);

    res.status(200).json({
        status: SUCCESS,
        msg: "Exam retrived",
        data: exam,
    });
});

const createExam = asyncHandler(async (req, res, next) => {
    const {difficulty, numberOfQuestions, time, categoryId} = req.body;
    const questions = await getRandomQuestions(difficulty, numberOfQuestions, categoryId);
    
    const newExam = new Exam({
        difficulty, 
        numberOfQuestions,
        time: (time ? time : 10 * 60 * 1000), 
        categoryId
    });

    // newExam.userId = req.user.id;

    await newExam.save();

    // this array front end will send to backend in the req.body to grade the exam [{q_id, user_ans}]
    const questionsAndGrades = [];
    for(let i = 0; i < questions.length; ++i) {
        questionsAndGrades.push({
            questionId: questions[i]._id,
            userAns: null
        });
    }


    res.status(201).json({
        status: SUCCESS,
        msg: "Exam created",
        data: {
            "questions number": questions.length,
            newExam,
            questions,
            questionsAndGrades
        },
    });
});

const gradeExam = asyncHandler(async (req, res, next) => {
    const {questions} = req.body;

    const questionIds = questions.map(q => q.questionId);
    const dbQuestions = await Question.find({
        _id: {
            $in: questionIds
        }
    }).select('correctChoice')
    
    let grade = 0;
    for(let i = 0; i < dbQuestions.length; ++i) {
        const { _id, correctChoice } = dbQuestions[i];
        let userChoice = null;

        for(let j = 0; j < questions.length; ++j) {
            if(questions[j].questionId == _id) {
                userChoice = questions[j].userAns;
                break;
            }
        }
        
        if(correctChoice === userChoice)
            ++grade;
    }



    let exam = await Exam.findById(req.params.id);
    exam.grade = grade;
    exam.isGraded = true;
    await exam.save();
    res.status(201).json({
        status: SUCCESS,
        msg: "Exam graded",
        data: {
            Grade: grade,
            exam
        },
    });
});


module.exports = {
    getAllExams,
    getExam,
    createExam,
    gradeExam
};