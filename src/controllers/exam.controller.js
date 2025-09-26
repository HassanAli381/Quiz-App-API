const asyncHandler = require('express-async-handler');
const { SUCCESS, FAIL } = require('./../utils/responseStatus');
const AppError = require('../utils/AppError');
const { getSomeQuestions } = require('./question.controller');
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
    const questions = await getSomeQuestions(difficulty, numberOfQuestions, categoryId);
    // console.log('questions', questions);
    
    const newExam = new Exam({
        difficulty, 
        numberOfQuestions,
        time: (time ? time : 10 * 60 * 1000), 
        categoryId
    });

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
            exam_id: newExam._id,
            questions,
            questionsAndGrades
        },
    });
});

const gradeExam = asyncHandler(async (req, res, next) => {
    const {questions} = req.body;
    console.log('questions', questions);
    const questionIds = questions.map(q => q.questionId);
    console.log('questionIds', questionIds);
    const dbQuestions = await Question.find({
        _id: {
            $in: questionIds
        }
    }).select('correctChoice')
    console.log('dbQuestions', dbQuestions);

    
    let grade = 0;
    for(let i = 0; i < dbQuestions.length; ++i) {
        const { _id, correctChoice } = dbQuestions[i];
        console.log(_id, correctChoice);
        if(correctChoice === questions[i].userAns)
            ++grade;
    }

    let exam = await Exam.findById(req.params.id);
    console.log('exam', exam);
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