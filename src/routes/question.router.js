const express = require("express");
const asyncHandler = require('express-async-handler'); // Import the handler
const router = express.Router();
const questionSchema = require("../utils/validation/questionSchema");
const ajvValidation = require("../middlewares/ajvValidation")
const idParamHandler = require("../middlewares/id.middleware");
const {
    getQuestions,
    getQuestionbyId,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require("../controllers/question.controller");

router.param("id", idParamHandler);

router.get("/", asyncHandler(getQuestions));
router.get("/:id", asyncHandler(getQuestionbyId));
router.post("/",ajvValidation(questionSchema), asyncHandler(createQuestion));
router.put("/:id",ajvValidation(questionSchema), asyncHandler(updateQuestion));
router.delete("/:id", asyncHandler(deleteQuestion));

module.exports = router;