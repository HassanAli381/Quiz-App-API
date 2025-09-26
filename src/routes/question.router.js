const express = require("express");
const asyncHandler = require('express-async-handler'); // Import the handler
const router = express.Router();
const questionSchema = require("../utils/validation/questionSchema");
const ajvValidation = require("../middlewares/ajvValidation")
const idParamHandler = require("../middlewares/id.middleware");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const {
    getQuestions,
    getQuestionbyId,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require("../controllers/question.controller");

router.param("id", idParamHandler);

router.get("/", auth, asyncHandler(getQuestions));
router.get("/:id", ajvValidation(questionSchema), auth, asyncHandler(getQuestionbyId));
router.post("/", auth, isAdmin, asyncHandler(createQuestion));
router.put("/:id", ajvValidation(questionSchema), auth, isAdmin, asyncHandler(updateQuestion));
router.delete("/:id", auth, isAdmin, asyncHandler(deleteQuestion));

module.exports = router;